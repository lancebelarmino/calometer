import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, set, update, child, get, getDatabase, onValue } from 'firebase/database';
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth, db } from '../firebase-config';
import useAuth from '../hooks/useAuth';
import getError from '../utils/getError';

const AuthContext = React.createContext({
  onLogin: (email, password, from) => {},
  onLogout: () => {},
  onRegister: (email, password, defaultData) => {},
  onReset: (email, cb) => {},
  onOnboarded: (email, cb) => {},
});

export const setLocalItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalItem = (key) => {
  const localData = localStorage.getItem(key);
  return JSON.parse(localData);
};

export const removeLocalItem = (key) => {
  localStorage.removeItem('isOnboarded');
};

export const AuthContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [from, setFrom] = useState(null);
  const currentUser = useAuth();
  const dbRef = ref(db);
  const navigate = useNavigate();

  const loginHandler = async (email, password, from, errorCallback) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const snapshot = await get(child(dbRef, `users/${user.uid}`));
      const path = from || 'dashboard';

      if (snapshot.exists()) {
        const isOnboarded = snapshot.val().isOnboarded;
        setLocalItem('isOnboarded', isOnboarded);
      }

      navigate(path, { replace: true });
    } catch (error) {
      const errorMessage = getError(error.code);

      if (errorMessage.includes('user')) {
        errorCallback('email', errorMessage);
      }

      if (errorMessage.includes('password')) {
        errorCallback('password', errorMessage);
      }
    }
  };

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      navigate('/login', { replace: true });
    } catch (error) {
      const errorMessage = getError(error.code);
      console.log(errorMessage);
    }
  };

  const registerHandler = async (email, password, defaultData, errorCallback) => {
    try {
      removeLocalItem('isOnboarded');
      setLocalItem('isOnboarded', false);

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await set(ref(db, 'users/' + user.uid), defaultData);
      navigate('/onboarding', { replace: true });
    } catch (error) {
      const errorMessage = getError(error.code);
      errorCallback('email', errorMessage);
    }
  };

  const resetHandler = async (email, successCallback, errorCallback) => {
    try {
      await sendPasswordResetEmail(auth, email);
      successCallback();
    } catch (error) {
      const errorMessage = getError(error.code);
      errorCallback('email', errorMessage);
    }
  };

  const onboardedHandler = async (data, successCallback) => {
    try {
      await set(ref(db, 'users/' + currentUser.uid + '/profile'), data);
      await update(ref(db, 'users/' + currentUser.uid), { isOnboarded: true });
      successCallback();
    } catch (error) {
      const errorMessage = getError(error.code);
      console.log(errorMessage);
    }
  };

  useEffect(() => {
    const db = getDatabase();
    const userRef = ref(db, `users/${currentUser?.uid}`);

    return onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      setUserData(data);
    });
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        onLogin: loginHandler,
        onLogout: logoutHandler,
        onRegister: registerHandler,
        onReset: resetHandler,
        onOnboarded: onboardedHandler,
        from,
        setFrom,
        userData,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
