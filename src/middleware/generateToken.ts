import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config';

type User = {
  id?: number;
  email?: string;
  fullname?: string;
};

const generateToken = (user: User) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      fullname: user.fullname,
    },
    `${SECRET_KEY}`,
    { expiresIn: '1d' }
  );
};

export default generateToken;
