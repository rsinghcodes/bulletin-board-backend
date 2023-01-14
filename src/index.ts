import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers/index.js';

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(`${process.env.MONGODB}`)
  .then(async () => {
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });
    console.log(`🚀  Server ready at: ${url}`);
  })
  .catch((error: any) => console.error(error));
