import { GraphQLError } from 'graphql';
import bcrypt from 'bcryptjs';
import Joi from 'joi';

import UserType from './user.interface';
import User from '../../../models/User';

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
        userInput: { fullname, email, password, confirmPassword },
      }: { userInput: UserType }
    ) => {
      try {
        const schema = Joi.object({
          fullname: Joi.string().min(2),
          password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
          confirmPassword: Joi.ref('password'),
          email: Joi.string().email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] },
          }),
        }).with('password', 'confirmPassword');

        const { error } = schema.validate(
          {
            fullname,
            email,
            password,
            confirmPassword,
          },
          { presence: 'required' }
        );

        if (error) {
          throw new GraphQLError('Errors', {
            extensions: { code: 'BAD_USER_INPUT', error },
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

        // const token = generateToken(res);

        return {
          ...res,
          id: res._id,
          // token,
        };
      } catch (error) {}
    },
  },
};
