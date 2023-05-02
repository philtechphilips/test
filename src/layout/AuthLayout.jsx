import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useAuthContext from '../context/AuthContext';

const AuthLayout = () => {
  const { user, setUser } = useAuthContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, [setUser]);

  if (loading) {
    return null; // or render a loading indicator
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthLayout;
