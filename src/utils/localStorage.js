export const setLocalItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalItem = (key) => {
  const localData = localStorage.getItem(key);

  if (localData !== undefined) {
    return JSON.parse(localData);
  }

  return null;
};

export const removeLocalItem = (key) => {
  localStorage.removeItem(key);
};
