import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, set, update, child, get, getDatabase, onValue } from 'firebase/database';
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  deleteUser,
} from 'firebase/auth';
import { ref as storageRef, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import { auth, db, storage } from '../firebase-config';
import useAuth from '../hooks/useAuth';
import getError from '../utils/getError';
import { setLocalItem, getLocalItem, removeLocalItem } from '../utils/localStorage';

const AuthContext = React.createContext({
  onLogin: (email, password, from) => {},
  onLogout: () => {},
  onRegister: (email, password, defaultData) => {},
  onReset: (email, cb) => {},
  onOnboarded: (email, cb) => {},
  onUpdateSettings: (updates) => {},
  onImageUpload: (image) => {},
  onChangePassword: (password, cb) => {},
  onDeleteAccount: () => {},
  getImageURL: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [from, setFrom] = useState(null);
  const currentUser = useAuth();
  const dbRef = ref(db);
  const navigate = useNavigate();

  const loginHandler = async (email, password, errorCallback) => {
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

      if (errorMessage.includes('user') || errorMessage.includes('password')) {
        errorCallback('password', 'Invalid username or password');
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

  const updateProfileHandler = async (updates) => {
    try {
      await update(ref(db, 'users/' + currentUser.uid), updates);
    } catch (error) {
      const errorMessage = getError(error.code);
      console.log(errorMessage);
    }
  };

  const imageUploadHandler = async (image) => {
    const imageListRef = storageRef(storage, `users/${currentUser.uid}`);
    const imageRef = storageRef(storage, `users/${currentUser.uid}/avatar`);

    try {
      const data = await listAll(imageListRef);

      if (data.items.length === 1) {
        await deleteObject(imageRef);
      }

      await uploadBytes(imageRef, image);

      const url = await getDownloadURL(imageRef);

      await update(ref(db, 'users/' + currentUser.uid + '/profilePicture'), { url });

      setUserData((prevData) => ({ ...prevData, profilePicture: { ...prevData.profilePicture, url } }));

      let localStorageProfilePicture = getLocalItem('profile_picture');
      localStorageProfilePicture.url = url;
      setLocalItem('profile_picture', localStorageProfilePicture);
    } catch (error) {
      const errorMessage = getError(error.code);
      console.log(errorMessage);
    }
  };

  const passwordChangeHandler = async (password, successCallback, errorCallback) => {
    const credentials = EmailAuthProvider.credential(currentUser.email, password.currentPassword);

    try {
      await reauthenticateWithCredential(currentUser, credentials);
      await updatePassword(currentUser, password.newPassword);
      successCallback();
    } catch (error) {
      const errorMessage = getError(error.code);
      errorCallback('currentPassword', errorMessage);
      console.log(errorMessage);
    }
  };

  const deleteAccountHandler = async () => {
    const imageListRef = storageRef(storage, `users/${currentUser.uid}`);
    const imageRef = storageRef(storage, `users/${currentUser.uid}/avatar`);

    try {
      /**
       * Delete database
       */
      await set(ref(db, 'users/' + currentUser.uid), null);

      /**
       * Delete storage
       */
      const data = await listAll(imageListRef);

      if (data.items.length === 1) {
        await deleteObject(imageRef);
      }

      /**
       * Delete user
       */
      await deleteUser(currentUser);
    } catch (error) {
      console.log(error);
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
        onUpdateSettings: updateProfileHandler,
        onImageUpload: imageUploadHandler,
        onChangePassword: passwordChangeHandler,
        onDeleteAccount: deleteAccountHandler,
        from,
        setFrom,
        userData,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
