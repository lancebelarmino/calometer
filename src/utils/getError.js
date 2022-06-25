export default function getError(error) {
  const unformattedError = error.split('/').pop();
  const formattedError = unformattedError.replace(/-/g, ' ');

  return formattedError;
}
