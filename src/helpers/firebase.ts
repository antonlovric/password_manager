import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyB_KOUZ-FZn84aiqsLxh6sFuy_iZwBOMFA',
  authDomain: 'si-milakovic-lovric.firebaseapp.com',
  projectId: 'si-milakovic-lovric',
  storageBucket: 'si-milakovic-lovric.appspot.com',
  messagingSenderId: '561636473841',
  appId: '1:561636473841:web:ac545cd1a4527210f2a250',
  measurementId: 'G-52MD7NF4X5',
  databaseURL: import.meta.env.DATABASE,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const database = getDatabase(app);
