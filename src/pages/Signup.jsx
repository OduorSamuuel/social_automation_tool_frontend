import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { GoogleLogin } from '@react-oauth/google';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalMessage, setGeneralMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    // Clear field-specific error when user starts typing
    setFieldErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setFieldErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      return;
    }
    setIsLoading(true);
    setFieldErrors({});
    setGeneralMessage('');

    try {
      const response = await axios.post('http://localhost:8000/api/auth/signup/', formData);
      setGeneralMessage(response.data.message || 'Signup successful!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error('Signup error:', error.response?.data);
      if (error.response?.data && typeof error.response.data === 'object') {
        // Handle field-specific errors
        setFieldErrors(error.response.data);
      } else {
        // Handle general error message
        setGeneralMessage(error.response?.data?.error || 'An error occurred during signup');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[A-Z]/)) strength += 25;
    if (password.match(/[a-z]/)) strength += 25;
    if (password.match(/[0-9]/)) strength += 25;
    if (password.match(/[^A-Za-z0-9]/)) strength += 25;
    return Math.min(100, strength);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 50) return 'bg-red-500';
    if (passwordStrength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  useEffect(() => {
    let timer;
    if (generalMessage) {
      timer = setTimeout(() => setGeneralMessage(''), 5000);
    }
    return () => clearTimeout(timer);
  }, [generalMessage]);
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
        const response = await axios.post('http://localhost:8000/api/auth/google/', {
            token: credentialResponse.credential,
        }, { withCredentials: true });  // Enable cookies in the request

        console.log('Google auth response:', response.data);

        // Log the session key from the response
        const sessionKey = response.data.session_key;
        console.log('Session Key:', sessionKey);

        setTimeout(() => {
          window.location.href = '/dashboard'; // Use window.location.href for redirection
      }, 2000);
    } catch (error) {
        console.error('Google signup error:', error.response?.data);
        setGeneralMessage(error.response?.data?.error || 'An error occurred during Google signup');
    }
};


const handleGoogleFailure = (error) => {
    console.error('Google signup failed:', error);
    // You can provide more specific feedback based on the error if available
    setGeneralMessage('Google signup failed. Please try again.');
};


  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center items-center">
      <div className="max-w-screen-lg w-full bg-white shadow-md rounded-lg flex">
        <div className="w-full md:w-1/2 p-8 sm:p-10">
          <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>

          {generalMessage && (
            <div className={`mb-4 p-2 rounded ${generalMessage.toLowerCase().includes('error') || generalMessage.toLowerCase().includes('failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {generalMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                className={`w-full px-4 py-2 rounded-lg border ${fieldErrors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-indigo-500`}
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
                className={`w-full px-4 py-2 rounded-lg border ${fieldErrors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-indigo-500`}
                type={passwordVisible ? "text" : "password"}
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

            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${getPasswordStrengthColor()}`}
                  style={{ width: `${passwordStrength}%` }}
                ></div>
              </div>
              <p className="text-sm mt-1">Password strength: {passwordStrength < 50 ? 'Weak' : passwordStrength < 75 ? 'Medium' : 'Strong'}</p>
            </div>

            <div className="mb-4">
              <input
                className={`w-full px-4 py-2 rounded-lg border ${fieldErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-indigo-500`}
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
              />
              {fieldErrors.confirmPassword && (
                <p className="text-red-500 text-xs italic mt-1">{fieldErrors.confirmPassword}</p>
              )}
            </div>

            <button
              className={`w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center justify-center ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <FontAwesomeIcon icon={faUser} className="mr-2" />
              )}
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600 text-sm">
            By signing up, you agree to the 
            <a href="#" className="text-indigo-500"> Terms of Service </a> 
            and 
            <a href="#" className="text-indigo-500"> Privacy Policy</a>.
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
              clientId="161841218791-6rgpmnm1inblhi5bk0gvvntn0ulku4mr.apps.googleusercontent.com"
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
                    {/* ... Google icon SVG ... */}
                  </svg>
                  Google
                </button>
              )}
            />

            {/* ... GitHub button ... */}
          </div>
          </div>
        </div>

        <div className="hidden md:flex flex-1 bg-indigo-100 justify-center items-center">
          <img
            className="w-full h-full object-cover"
            src="https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg"
            alt="Signup illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;