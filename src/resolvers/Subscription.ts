//@ts-nocheck
export const Subscription = {
  test: {
    subscribe: (parent, args, { db, pubSub }) => pubSub.subscribe("test"),
    resolve: (payload) => {
      return payload;
    },
  },
};
