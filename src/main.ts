//@ts-nocheck

import { createPubSub, createSchema, createYoga } from "graphql-yoga";
import { createServer } from "http";
import { Query } from "./resolvers/Query";
import { Cv } from "./resolvers/Cv";
import { Subscription } from "./resolvers/Subscription";
import { data } from "./Data/database";

const fs = require("fs");
const path = require("path");

function main() {
  const pubSub = createPubSub();
  const yoga = createYoga({
    schema: createSchema({
      typeDefs: fs.readFileSync(
        path.join(__dirname, "schema/schema.graphql"),
        "utf-8"
      ),
      resolvers: {
        Cv,
        Query,
        Subscription,
      },
    }),
    context() {
      return { data, pubSub };
    },
  });
  const server = createServer(yoga);
  server.listen(4000, () => {
    console.info("Server is running on http://localhost:4000/graphql");
  });
}

main();
