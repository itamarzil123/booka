import React from 'react';
import { render } from '@testing-library/react';
import { validateEmail, validatePassword } from '../../utils/validations.utils';

describe('Authentication Utils: validateEmail', () => {
  it('should validate email formatting correctly', () => {
    const isEmailValid = validateEmail('wow@gmail.net');
    expect(isEmailValid).toBe(true);
  });
  it('should validate email formatting correctly', () => {
    const isEmailValid = validateEmail('wow');
    expect(isEmailValid).toBe(false);
  });
});

describe('Authentication Utils: validatePassword', () => {
  it('should validate password length correctly', () => {
    const isEmailValid = validatePassword('wow');
    expect(isEmailValid).toBe(false);
  });
  it('should validate password length correctly', () => {
    const isEmailValid = validatePassword('asdasd');
    expect(isEmailValid).toBe(true);
  });
  it('should validate password not empty', () => {
    const isEmailValid = validatePassword('');
    expect(isEmailValid).toBe(false);
  });
});
