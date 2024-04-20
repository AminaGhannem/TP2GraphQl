// @ts-nocheck

export const Cv = {
  skills: (cv, args, { data }) => {
    return data.cvSkills
      .filter((cs) => cs.cvId === cv.id)
      .map((cs) => data.skills.find((skill) => skill.id === cs.skillId));
  },
  owner: (cv, args, { data }) => {
    return data.users.find((user) => user.id === cv.owner);
  },
};
