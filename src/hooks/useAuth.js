import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase-config';

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState('loading');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setCurrentUser(user));

    return unsubscribe;
  });

  return currentUser;
};

export default useAuth;
