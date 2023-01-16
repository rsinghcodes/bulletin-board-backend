import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config';
import { UserDoc } from '../models/User';

const generateToken = (user: UserDoc) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      fullname: user.fullname,
    },
    `${SECRET_KEY}`,
    { expiresIn: '1d' }
  );
};

export default generateToken;
