export const Cv = {
  owner(parent: any, args: any, context: any, info: any) {
    return context.prisma.cv
      .findUnique({
        where: {
          id: parent.id,
        },
      })
      .owner();
  },
  skills(parent: any, args: any, context: any, info: any) {
    return context.prisma.cv
      .findUnique({
        where: {
          id: parent.id,
        },
      })
      .skills();
  },
};
