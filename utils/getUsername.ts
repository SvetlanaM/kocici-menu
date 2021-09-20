import setUppercaseTitle from './setUppercaseTitle';

export const getUsername = (email: string): string => {
  if (!email) {
    return null;
  }
  let name = setUppercaseTitle(email.substring(0, email.lastIndexOf('@')));
  if (name.substring(0, name.lastIndexOf('.')) !== '') {
    name = name.substring(0, name.lastIndexOf('.'));
    return name;
  }
  return name;
};
