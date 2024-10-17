import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'; // Import the hook

const RedirectRoute = ({ children }) => {
  const { user, loading } = useAuth();  // Use the custom hook to check auth status
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');  // Redirect authenticated users to home page
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;  // Show a loading screen while checking auth status
  }

  return !user ? children : null;  // Render the login form only if user is not authenticated
};

export default RedirectRoute;
