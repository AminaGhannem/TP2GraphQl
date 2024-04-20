//@ts-nocheck
export const Subscription = {
  cvEvent: {
    subscribe: (parent, args, { db, pubSub }) => pubSub.subscribe("cvEvent"),
    resolve: (payload) => {
      return payload;
    },
  },
};
