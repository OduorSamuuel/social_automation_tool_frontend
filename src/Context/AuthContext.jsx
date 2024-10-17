import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            // Log the cookies
            console.log('Current cookies:', document.cookie);

            const response = await axios.get('http://localhost:8000/api/auth/me/', { withCredentials: true });
            console.log('Auth check response:', response.data);

            if (response.data.is_authenticated) {  // Use the backend's `is_authenticated`
                setIsAuthenticated(true);
                setUser(response.data);  // Set the entire response data as user
            }
        } catch (error) {
            console.error('Auth check failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post('/api/login/', { email, password }, { withCredentials: true });
            setIsAuthenticated(true);
            setUser(response.data.user);
            return true;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    };

    const logout = async () => {
        try {
            // Get the CSRF token from the cookie
            const csrftoken = Cookies.get('csrftoken');
    
            // Send the logout request with CSRF token in headers
            await axios.post('http://localhost:8000/api/auth/logout/', {}, {
                withCredentials: true,
                headers: {
                    'X-CSRFToken': csrftoken // Include CSRF token in headers
                }
            });
    
            setIsAuthenticated(false);
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const signup = async (userData) => {
        try {
            const response = await axios.post('/api/signup/', userData, { withCredentials: true });
            return response.data;
        } catch (error) {
            console.error('Signup failed:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, signup, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
