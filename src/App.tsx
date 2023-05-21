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

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route path='registration' element={<Registration />} />
        <Route path='login' element={<LoginPage />} />
        <Route index element={<HomePage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
