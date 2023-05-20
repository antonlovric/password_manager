import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../stores/UserStore';

const MainLayout = () => {
  const { user } = useUserStore();
  return (
    <>
      <Outlet />
    </>
  );
};

export default MainLayout;
