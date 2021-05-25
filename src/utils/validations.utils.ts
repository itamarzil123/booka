import validator from 'validator';

export const validateEmail = (email: string) => {
  return validator.isEmail(email);
};

export const validatePassword = (password: string) => {
  const reg = /[0-9a-zA-Z]{6,}/;
  const test = reg.test(password);
  return test;
};

export const validateName = (name: string) => {
  const reg = /[0-9a-zA-Z]{6,}/;
  const test = reg.test(name);
  return test;
};
