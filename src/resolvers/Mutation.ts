//@ts-nocheck
import { randomUUID } from "crypto";
import { GraphQLError } from "graphql";

export const Mutation = {
  addCv: (_, { input }, data) => {
    const newCv = {
      id: randomUUID(),
      name: input.name,
      age: input.age,
      job: input.job,
      owner: input.owner,
    };
    // check if the user already exists
    const userExists = data.users.find((user) => user.id === input.owner);
    if (!userExists) {
      throw new GraphQLError("User does not exist");
    }
    // check if the skills already exist
    const skillsExists = input.skills.every((skillId) =>
      data.skills.some((skill) => skill.id === skillId)
    );
    if (!skillsExists) {
      throw new GraphQLError("Skills does not exist");
    }
    data.cvs.push(newCv);
    input.skills.forEach((skill) => {
      data.cvSkills.push({ cvId: newCv.id, skillId: skill });
    });
    return newCv.id;
  },
  deleteCv: (_, { id }, data) => {
    id = String(id);
    const cvIndex = data.cvs.findIndex((cv) => cv.id === id);
    if (cvIndex === -1) {
      throw new GraphQLError("CV does not exist");
    }
    data.cvs.splice(cvIndex, 1);
    data.cvSkills = data.cvSkills.filter((cvSkill) => cvSkill.cvId !== id);
    return id;
  },
  updateCv: (_, { input }, data) => {
    const cvIndex = data.cvs.findIndex((cv) => cv.id === input.id);
    if (cvIndex === -1) {
      throw new GraphQLError("CV does not exist");
    }
    const cv = data.cvs[cvIndex];
    if (cv.name) cv.name = input.name;
    if (cv.age) cv.age = input.age;
    if (cv.job) cv.job = input.job;
    if (input.skills) {
      const skillsExists = input.skills.every((skillId) =>
        data.skills.some((skill) => skill.id === skillId)
      );
      if (!skillsExists) {
        throw new GraphQLError("Skills does not exist");
      }
      data.cvSkills = data.cvSkills.filter(
        (cvSkill) => cvSkill.cvId !== input.id
      );
      input.skills.forEach((skill) => {
        data.cvSkills.push({ cvId: input.id, skillId: skill });
      });
    }
    console.log(data);
    return cv.id;
  },
};
