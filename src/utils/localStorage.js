export const setLocalItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalItem = (key) => {
  const localData = localStorage.getItem(key);
  return JSON.parse(localData);
};

export const removeLocalItem = (key) => {
  localStorage.removeItem(key);
};
