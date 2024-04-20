export const Mutation = {
  createCV: async (parent: any, args: any, context: any, info: any) => {
    try {
      const skillIds = args.input.skills;
      const userId = args.input.ownerId;
      const skills = await CheckIfSkillsExist(skillIds, context);
      const user = await context.prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) throw new Error("User does not exist.");

      const cv = await context.prisma.cv.create({
        data: {
          name: args.input.name,
          age: args.input.age,
          job: args.input.job,
          ownerId: userId,
          skills: {
            createMany: {
              data: skills.map((skill: any) => ({
                skillId: skill.id,
              })),
            },
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
    const skillIds = args.input.skills;
    const skills = await CheckIfSkillsExist(skillIds, context);

    const updatedCV = await context.prisma.cv.update({
      where: { id: args.input.id },
      data: {
        name: args.input.name,
        age: args.input.age,
        job: args.input.job,
        skills: {
          createMany: {
            data: skills.map((skill: any) => ({
              skillId: skill.id,
            })),
          },
        },
      },
    });
    return updatedCV;
  },

  deleteCV: async (parent: any, args: any, context: any, info: any) => {
    try {
      await context.prisma.cvSkill.deleteMany({
        where: { cvId: args.id },
      });
      return context.prisma.cv.delete({
        where: { id: args.id },
      });
    } catch (error: any) {
      console.error("Error deleting CV:", error);
      throw new Error("Failed to delete CV due to an error: " + error.message);
    }
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
  const skills = await context.prisma.skill.findMany({
    where: {
      id: { in: skillIds },
    },
  });
  if (skills.length !== skillIds.length) {
    throw new Error("One or more skills do not exist.");
  }
  return skills;
};


