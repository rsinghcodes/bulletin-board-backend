import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose';

import { MONGODB } from './config';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers/index.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(`${MONGODB}`)
  .then(async () => {
    const { url } = await startStandaloneServer(server, {
      context: async ({ req }) => ({ req }),
      listen: { port: 4000 },
    });
    console.log(`🚀  Server ready at: ${url}`);
  })
  .catch((error: any) => console.error(error));
