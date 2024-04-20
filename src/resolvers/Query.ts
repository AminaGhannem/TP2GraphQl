// @ts-nocheck

import { GraphQLError } from "graphql";

export const Query = {
  getAllCVs: (parent, args, { data, pubSub }) => {
    pubSub.publish("test", "test");
    return data.cvs;
  },
  getCVById: (parent, args, { data }) => {
    const cv = data.cvs.find((cv) => cv.id === args.id);
    if (!cv) throw new GraphQLError("Cv does not exist");
  },
};
