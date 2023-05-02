import { Navigate, Outlet } from 'react-router-dom'
import useAuthContext from '../context/AuthContext'
import { useEffect } from 'react';

const GuestLayout = () => {
    const { user, setUser } = useAuthContext();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        //   console.log(user)
        }
      }, [setUser]);

      return !user ? <Outlet /> : <Navigate to="/" />
}

export default GuestLayout