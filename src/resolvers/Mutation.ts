export const Mutation = {
  createCV: async (parent: any, args: any, context: any, info: any) => {
    try {
      const skillIds = await CheckIfSkillsExist(args.input.skills, context);
      const userId = await CheckIfUserExists(args.input.ownerId, context);

      const cv = await context.prisma.cv.create({
        data: {
          name: args.input.name,
          age: args.input.age,
          job: args.input.job,
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
      return cv;
    } catch (error: any) {
      console.error("Error creating CV:", error);
      throw new Error("Failed to create CV due to an error: " + error.message);
    }
  },

  updateCV: async (parent: any, args: any, context: any, info: any) => {
    const skillIds = await CheckIfSkillsExist(args.input.skillIds, context);
    return context.prisma.cv.update({
      where: {
        id: args.input.id,
      },
      data: {
        name: args.input.name,
        age: args.input.age,
        job: args.input.job,
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
        id: args.input.id,
      },
    });
  },
  createSkill: async (parent: any, args: any, context: any, info: any) => {
    return context.prisma.skill.create({
      data: {
        designation: args.input.designation,
      },
    });
  },

  createUser: async (parent: any, args: any, context: any, info: any) => {
    try {
      const newUser = await context.prisma.user.create({
        data: {
          name: args.input.name,
          email: args.input.email,
          role: args.input.role,
        },
      });
      console.log("New User Created:", newUser);
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user due to an error.");
    }
  },
};

const CheckIfSkillsExist = async (skillIds: any, context: any) => {
  if (!Array.isArray(skillIds) || skillIds.length === 0) {
    throw new Error("Skills input is missing or empty.");
  }

  const existingSkills = await context.prisma.skill.findMany({
    where: {
      id: {
        in: skillIds,
      },
    },
  });
  const existingSkillIds = existingSkills.map((skill: any) => skill.id);
  const allSkillsExist = skillIds.every((id) => existingSkillIds.includes(id));

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
