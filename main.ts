import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import mongoose from "mongoose";

import { typeDefs } from "./resolvers/schema.ts";
import { resolvers } from "./resolvers/resolvers.ts";

const MONGO_URL: string | undefined = Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("Url not found in env");
  Deno.exit(1);
}

mongoose.connect(MONGO_URL);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);