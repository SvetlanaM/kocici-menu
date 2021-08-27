import setUppercaseTitle from './setUppercaseTitle';

export const getUsername = (email: string): string => {
  if (!email) {
    return null;
  }

  let name = setUppercaseTitle(email.substr(0, email.lastIndexOf('@')));
  if (name.substr(0, name.lastIndexOf('.')) !== '') {
    name = name.substr(0, name.lastIndexOf('.'));
    return name;
  }
  return name;
};
