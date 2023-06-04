import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import { supabase } from '../supabase';

const MainLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  supabase.auth.onAuthStateChange((event, session) => {
    event;
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
