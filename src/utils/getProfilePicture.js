import { getLocalItem } from '../utils/localStorage';

export default function getProfilePicture() {
  const localStorage = getLocalItem('profile_picture');

  if (localStorage) {
    return {
      image: null,
      url: localStorage.url,
      defaultColor: localStorage.defaultColor,
      initials: localStorage.initials,
    };
  }

  return { image: null, url: null, defaultColor: null, initials: null };
}
