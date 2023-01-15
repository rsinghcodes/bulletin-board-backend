import { GraphQLError } from 'graphql';
import bcrypt from 'bcryptjs';

import UserType from '../../interface/user';
import User from '../../models/User';
import { validateCreateUser } from '../../utils/validators';
import generateToken from '../../middleware/generateToken';

export default {
  Query: {
    getUser: async (_: null, { userId }: { userId: Number }) => {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (error) {
        throw new GraphQLError('User not found!', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error,
          },
        });
      }
    },
    getUsers: async (_: null) => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw new GraphQLError('Users not found!', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error,
          },
        });
      }
    },
  },
  Mutation: {
    createUser: async (
      _: null,
      {
        userInput: { fullname, email, password, repeat_password },
      }: { userInput: UserType }
    ) => {
      try {
        const { isValid, errors } = validateCreateUser({
          fullname,
          email,
          password,
          repeat_password,
        });

        console.log(isValid);

        if (!isValid) {
          throw new GraphQLError('Errors', {
            extensions: { code: 'BAD_USER_INPUT', errors },
          });
        }
        // Make sure user doesn't already exist
        const user = await User.findOne({ email });
        if (user) {
          throw new GraphQLError('Email is taken', {
            extensions: {
              code: 'BAD_USER_INPUT',
              errors: {
                email: 'Account is already created using this email!',
              },
            },
          });
        }
        // hash password and create an auth token
        password = await bcrypt.hash(password, 12);

        const newUser = new User({
          fullname,
          email,
          password,
          createdAt: new Date().toISOString(),
        });

        const res = await newUser.save();

        const token = generateToken(res);

        return {
          ...res,
          id: res._id,
          token,
        };
      } catch (error) {
        throw error;
      }
    },
  },
};
