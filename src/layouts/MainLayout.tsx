import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '../helpers/firebase';
import NavigationBar from '../components/NavigationBar';

const MainLayout = () => {
  const user = auth.currentUser;

  return (
    <>
      {user ? <NavigationBar /> : <Navigate to='login' />}
      <Outlet />
    </>
  );
};

export default MainLayout;
