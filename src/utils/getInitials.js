export default function getInitials(firstName, lastName) {
  const firstNameLetter = firstName.charAt(0);
  const lastNameLetter = lastName.charAt(0);

  return firstNameLetter + lastNameLetter;
}
