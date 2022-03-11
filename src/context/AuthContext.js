import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, set, update, child, get } from 'firebase/database';
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth, db } from '../firebase-config';
import useAuth from '../hooks/useAuth';

const AuthContext = React.createContext({
  onLogin: (email, password, from) => {},
  onLogout: () => {},
  onRegister: (email, password, defaultData) => {},
  onReset: (email, cb) => {},
  onOnboarded: (email, cb) => {},
});

const defaultError = {
  login: false,
  logout: false,
  register: false,
  reset: false,
  onboarding: false,
};

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

export const AuthContextProvider = (props) => {
  const [errors, setErrors] = useState(defaultError);
  const currentUser = useAuth();
  const dbRef = ref(db);
  const navigate = useNavigate();

  const loginHandler = async (email, password, from) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const snapshot = await get(child(dbRef, `users/${user.uid}`));

      if (snapshot.exists()) {
        const isOnboarded = snapshot.val().isOnboarded;
        setLocalItem('isOnboarded', isOnboarded);
      } else {
        console.log('No data available');
      }

      setErrors(defaultError);
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      setErrors((prevData) => {
        return { register: error, ...prevData };
      });
    }
  };

  const logoutHandler = async () => {
    await signOut(auth);
    navigate('/login', { replace: true });
  };

  const registerHandler = async (email, password, defaultData) => {
    try {
      removeLocalItem('isOnboarded');
      setLocalItem('isOnboarded', false);

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await set(ref(db, 'users/' + user.uid), defaultData);
      setErrors(defaultError);
      navigate('/onboarding', { replace: true });
    } catch (error) {
      console.log(error);
      setErrors((prevData) => {
        return { register: error, ...prevData };
      });
    }
  };

  const resetHandler = async (email, cb) => {
    try {
      await sendPasswordResetEmail(auth, email);
      cb();
    } catch (error) {
      console.log(error);
      setErrors((prevData) => {
        return { register: error, ...prevData };
      });
    }
  };

  const onboardedHandler = async (data, cb) => {
    try {
      await set(ref(db, 'users/' + currentUser.uid + '/profile'), data);
      await update(ref(db, 'users/' + currentUser.uid), { isOnboarded: true });
      cb();
    } catch (error) {
      console.log(error);
      console.log(error.code, error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        onLogin: loginHandler,
        onLogout: logoutHandler,
        onRegister: registerHandler,
        onReset: resetHandler,
        onOnboarded: onboardedHandler,
        errors,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
