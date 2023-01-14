import { GraphQLError } from 'graphql';
import Note from '../../models/Note';

export default {
  Query: {
    getNotes: async (_: null) => {
      try {
        const notes = await Note.find();
        return notes;
      } catch (error) {
        throw new GraphQLError('No notes available!', {
          extensions: {
            code: 'NOT_FOUND',
            error,
          },
        });
      }
    },
  },
  Mutation: {
    createNote: async (_: null) => {},
  },
};
