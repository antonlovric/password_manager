import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../stores/UserStore';

const MainLayout = () => {
  const { user } = useUserStore();
  return <>{!user ? <Navigate to={'/registration'} /> : <Outlet />}</>;
};

export default MainLayout;
