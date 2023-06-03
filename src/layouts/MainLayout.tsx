import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '../helpers/firebase';
import NavigationBar from '../components/NavigationBar';
import { onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';

const MainLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!auth.currentUser);

  onAuthStateChanged(auth, (user) => {
    setIsLoggedIn(!!user?.emailVerified);
  });

  return (
    <>
      {isLoggedIn ? <NavigationBar /> : <Navigate to='login' />}
      <Outlet />
    </>
  );
};

export default MainLayout;
