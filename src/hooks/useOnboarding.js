import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase-config';
import useAuth from './useAuth';

const useOnboarding = () => {
  const [onboarded, setOnboarded] = useState();
  const currentUser = useAuth();

  useEffect(() => {
    if (currentUser) {
      return onValue(
        ref(db, '/users/' + currentUser.uid),
        (snapshot) => {
          const isOnboarded = snapshot.val().isOnboarded;
          setOnboarded(isOnboarded);
        },
        {
          onlyOnce: true,
        }
      );
    }
  }, [currentUser]);

  return onboarded;
};

export default useOnboarding;
