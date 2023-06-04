import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Registration from './pages/RegistrationPage/RegistrationPage';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import VerificationPage from './pages/VerifcationPage/VerificationPage';
import { authLoader, nonAuthLoader } from './helpers/loaders';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route loader={nonAuthLoader} index element={<HomePage />} />
        <Route loader={authLoader} path='registration' element={<Registration />} />
        <Route path='*' element={<NotFoundPage />} />
        <Route loader={authLoader} path='login' element={<LoginPage />} />
        <Route loader={authLoader} path='verification' element={<VerificationPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
