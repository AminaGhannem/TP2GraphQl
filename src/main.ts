import { data } from "./Data/database";
import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "http";
import { Query } from "./resolvers/Query";
import { Mutation } from "./resolvers/Mutation";

const fs = require("fs");
const path = require("path");

function main() {
  const yoga = createYoga({
    schema: createSchema({
      typeDefs: fs.readFileSync(
        path.join(__dirname, "schema/schema.graphql"),
        "utf-8"
      ),
      resolvers: {
        Query,
        Mutation,
      },
    }),
    context() {
      return data;
    },
  });
  const server = createServer(yoga);
  server.listen(4000, () => {
    console.info("Server is running on http://localhost:4000/graphql");
  });
}

main();
