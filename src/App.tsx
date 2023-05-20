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

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB_KOUZ-FZn84aiqsLxh6sFuy_iZwBOMFA',
  authDomain: 'si-milakovic-lovric.firebaseapp.com',
  projectId: 'si-milakovic-lovric',
  storageBucket: 'si-milakovic-lovric.appspot.com',
  messagingSenderId: '561636473841',
  appId: '1:561636473841:web:ac545cd1a4527210f2a250',
  measurementId: 'G-52MD7NF4X5',
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route path='registration' element={<Registration />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
