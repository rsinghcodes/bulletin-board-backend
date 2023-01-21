import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';

import { SECRET_KEY } from '../config';

interface JwtPayload {
  id: string;
}

export default (context: any) => {
  // context = { ... headers }
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // Bearer ....
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, `${SECRET_KEY}`) as JwtPayload;
        return user;
      } catch (err) {
        throw new GraphQLError('Invalid/Expired token', {
          extensions: { code: 'AUTHENTICATION_ERROR' },
        });
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error('Authorization header must be provided');
};
