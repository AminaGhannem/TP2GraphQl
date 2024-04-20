export const Mutation = {
  createCV: async (parent: any, args: any, context: any, info: any) => {
    const skillIds = await CheckIfSkillsExist(args.skillIds, context);
    const userId = await CheckIfUserExists(args.ownerId, context);
    return context.prisma.cv.create({
      data: {
        name: args.name,
        age: args.age,
        job: args.job,
        owner: {
          connect: {
            id: userId,
          },
        },
        skills: {
          connect: skillIds.map((id: any) => ({ id })),
        },
      },
    });
  },
  updateCV: async (parent: any, args: any, context: any, info: any) => {
    const skillIds = await CheckIfSkillsExist(args.skillIds, context);
    return context.prisma.cv.update({
      where: {
        id: args.id,
      },
      data: {
        name: args.name,
        age: args.age,
        job: args.job,
        skills: {
          set: [],
          connect: skillIds.map((id: any) => ({ id })),
        },
      },
    });
  },
  deleteCV: async (parent: any, args: any, context: any, info: any) => {
    return context.prisma.cv.delete({
      where: {
        id: args.id,
      },
    });
  },
  createSkill: async (parent: any, args: any, context: any, info: any) => {
    return context.prisma.skill.create({
      data: {
        designation: args.designation,
      },
    });
  },

  createUser: async (parent: any, args: any, context: any, info: any) => {
    return context.prisma.user.create({
      data: {
        name: args.name,
        email: args.email,
        role: args.role,
      },
    });
  },
};

const CheckIfSkillsExist = async (skillIds: any, context: any) => {
  const existingSkills = await context.prisma.skill.findMany({
    where: {
      id: {
        in: skillIds,
      },
    },
  });
  const existingSkillIds = existingSkills.map((skill: any) => skill.id);
  const allSkillsExist = skillIds.every((id: any) =>
    existingSkillIds.includes(id)
  );

  if (!allSkillsExist) {
    throw new Error("One or more skills do not exist.");
  }
  return existingSkillIds;
};

const CheckIfUserExists = async (userId: any, context: any) => {
  const user = await context.prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw new Error("User does not exist.");
  }
  return user.id;
};
