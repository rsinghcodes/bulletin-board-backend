import userResolver from './user';
import noteResolver from './note';

export default {
  Query: {
    ...userResolver.Query,
    ...noteResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
  },
};
