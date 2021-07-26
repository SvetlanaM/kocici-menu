import setUppercaseTitle from './setUppercaseTitle';

export const getUsername = (email: string): string => {
  return setUppercaseTitle(email.substr(0, email.lastIndexOf('@')));
};
