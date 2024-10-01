import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AuthLayout({ children, authentication }) {
  const authStatus = useSelector(state => state.auth.status); // Check the current auth status
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Loading state for initial check

  useEffect(() => {
    const checkAuth = () => {
      // If authentication is required but user is not authenticated
      if (authentication && !authStatus) {
        console.log('Redirecting to login...');
        navigate('/login');
      }
      // If authentication is not required but user is authenticated
      else if (!authentication && authStatus) {
        console.log('Redirecting to home...');
        navigate('/');
      }
      setLoading(false);
    };

    checkAuth();
  }, [authStatus, authentication,navigate]);

  // Show loading indicator while checking auth status
  return loading ? <div>Loading...</div> : <>{children}</>;
}

export default AuthLayout;
