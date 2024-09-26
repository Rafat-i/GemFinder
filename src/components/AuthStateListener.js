// src/components/AuthStateListener.js
import { useEffect } from 'react';
import { auth } from '../Firebase';
import { useAuth } from '../context/AuthContext';

const AuthStateListener = () => {
  const { setCurrentUser } = useAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, [setCurrentUser]);

  return null;
};

export default AuthStateListener;
