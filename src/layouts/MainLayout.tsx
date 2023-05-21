import { Outlet } from 'react-router-dom';
import { auth } from '../helpers/firebase';
import NavigationBar from '../components/NavigationBar';

const MainLayout = () => {
  const user = auth.currentUser;

  return (
    <>
      {user && <NavigationBar />}
      <Outlet />
    </>
  );
};

export default MainLayout;
