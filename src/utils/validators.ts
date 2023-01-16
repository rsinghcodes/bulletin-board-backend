import Validator from 'validator';
import isEmpty from 'is-empty';

import { UserType, LoginUserType } from '../interface/user';

interface ErrorsTypes {
  [key: string]: string;
}

export const validateCreateUser = ({
  fullname,
  email,
  password,
  repeat_password,
}: UserType) => {
  const errors: ErrorsTypes = {};

  fullname = !isEmpty(fullname) ? fullname : '';
  email = !isEmpty(email) ? email : '';
  password = !isEmpty(password) ? password : '';
  repeat_password = !isEmpty(repeat_password) ? repeat_password : '';

  if (Validator.isEmpty(fullname)) {
    errors.fullname = 'Name field is required';
  }
  if (Validator.isEmpty(email)) {
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(email)) {
    errors.email = 'Please choose valid Email format';
  }
  if (Validator.isEmpty(password)) {
    errors.password = 'Password field is required';
  }
  if (Validator.isEmpty(repeat_password)) {
    errors.repeat_password = 'Confirm password field is required';
  }
  if (!Validator.isLength(password, { min: 6, max: 20 })) {
    errors.password = 'Password must be at least 6 characters';
  }
  if (!Validator.equals(password, repeat_password)) {
    errors.repeat_password = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export const validateLoginInput = ({ email, password }: LoginUserType) => {
  const errors: ErrorsTypes = {};

  email = !isEmpty(email) ? email : '';
  password = !isEmpty(password) ? password : '';

  if (Validator.isEmpty(email)) {
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(email)) {
    errors.email = 'Please choose valid Email format!';
  }
  if (Validator.isEmpty(password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
