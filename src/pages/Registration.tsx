import React from 'react';
import { useUserStore } from '../stores/UserStore';

const Registration = () => {
  const { setUser } = useUserStore();
  return <div>Registration</div>;
};

export default Registration;
