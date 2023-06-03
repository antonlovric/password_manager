import { Navigate, Outlet } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import { useState } from 'react';
import { supabase } from '../main';

const MainLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  supabase.auth.onAuthStateChange((event, session) => {
    setIsLoggedIn(!!session?.user);
  });

  return (
    <>
      {isLoggedIn ? <NavigationBar /> : <Navigate to='login' />}
      <Outlet />
    </>
  );
};

export default MainLayout;
