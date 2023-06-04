import { redirect } from 'react-router-dom';
import { supabase } from '../supabase';

export const authLoader = async () => {
  const res = await supabase.auth.getUser();
  const user = res.data.user;
  const isLoggedIn = user?.email_confirmed_at || null;
  return isLoggedIn ? redirect('/') : null;
};

export const nonAuthLoader = async () => {
  const res = await supabase.auth.getUser();
  const user = res.data.user;
  const isLoggedIn = user?.email_confirmed_at || null;
  return !isLoggedIn ? redirect('/login') : null;
};
