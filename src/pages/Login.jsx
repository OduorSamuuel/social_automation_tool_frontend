import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalMessage, setGeneralMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFieldErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFieldErrors({});
    setGeneralMessage('');
    
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login/', formData, {
        withCredentials: true,  // Ensure cookies are included in the request
      });
    
      setGeneralMessage('Login successful!');
      
      // Redirect to the dashboard after successful login
      setTimeout(() => window.location.href = '/dashboard', 2000);
    } catch (error) {
      console.error('Login error:', error.response?.data);
      if (error.response?.data && typeof error.response.data === 'object') {
        setFieldErrors(error.response.data);
        setGeneralMessage(error.response.data?.error || 'An error occurred during login');  // Display backend error message
      } else {
        setGeneralMessage('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    let timer;
    if (generalMessage) {
      timer = setTimeout(() => setGeneralMessage(''), 5000);
    }
    return () => clearTimeout(timer);
  }, [generalMessage]);

  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    setGeneralMessage('');
    
    try {
      const response = await axios.post('http://localhost:8000/api/auth/google/', {
        token: credentialResponse.credential,
      }, { withCredentials: true });

      console.log('Google auth response:', response.data);
      setGeneralMessage('Google login successful!');
      setTimeout(() => {
        window.location.href = '/dashboard'; 
      }, 2000);
    } catch (error) {
      console.error('Google login error:', error.response?.data);
      setGeneralMessage(error.response?.data?.error || 'An error occurred during Google login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleFailure = (error) => {
    console.error('Google login failed:', error);
    setGeneralMessage('Google login failed. Please try again.');
  };

  return (
<div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center items-center">
  <div className="max-w-screen-lg w-full bg-white shadow-md rounded-lg flex">
    <div className="w-full md:w-1/2 p-8 sm:p-10">
      <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

      {generalMessage && (
        <div
          className={`mb-4 p-2 rounded ${
            generalMessage.toLowerCase().includes('error') || generalMessage.toLowerCase().includes('invalid')
              ? 'bg-red-100 text-red-700'
              : 'bg-green-100 text-green-700'
          }`}
        >
          {generalMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            className={`w-full px-4 py-2 rounded-lg border ${
              fieldErrors.email ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:border-indigo-500`}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          {fieldErrors.email && (
            <p className="text-red-500 text-xs italic mt-1">{fieldErrors.email[0]}</p>
          )}
        </div>

        <div className="relative mb-4">
          <input
            className={`w-full px-4 py-2 rounded-lg border ${
              fieldErrors.password ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:border-indigo-500`}
            type={passwordVisible ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <span
            className="absolute right-4 top-3 cursor-pointer text-gray-600"
            onClick={togglePasswordVisibility}
          >
            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
          </span>
          {fieldErrors.password && (
            <p className="text-red-500 text-xs italic mt-1">{fieldErrors.password[0]}</p>
          )}
        </div>

        <button
          className={`w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center justify-center ${
            isLoading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <FontAwesomeIcon icon={faUser} className="mr-2" />
          )}
          {isLoading ? 'Logging In...' : 'Log In'}
        </button>
      </form>

      <p className="mt-6 text-center text-gray-600 text-sm">
        Don't have an account?
        <a href="/signup" className="text-indigo-500"> Sign Up</a>.
      </p>

      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
            cookiePolicy={'single_host_origin'}
            render={renderProps => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-300"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                  {/* Google icon SVG */}
                </svg>
                Google
              </button>
            )}
          />
        </div>
      </div>
    </div>

    <div className="hidden md:flex flex-1 bg-indigo-100 justify-center items-center">
      <img
        className="w-full h-full object-cover"
        src="https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg"
        alt="Login illustration"
      />
    </div>
  </div>
</div>

  );
};

export default Login;