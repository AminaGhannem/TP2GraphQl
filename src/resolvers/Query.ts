export const Query = {
  getAllCVs: async (parent: any, args: any, context: any, info: any) => {
    return context.prisma.cv.findMany();
  },
  getCVById: async (parent: any, args: any, context: any, info: any) => {
    return context.prisma.cv.findUnique({
      where: {
        id: args.id,
      },
    });
  },
};
