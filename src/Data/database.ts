export const data = {
  users: [
    { id: "1", name: "Alice Smith", email: "alice@example.com", role: "ADMIN" },
    { id: "2", name: "Bob Johnson", email: "bob@example.com", role: "USER" },
  ],
  skills: [
    { id: "1", designation: "JavaScript" },
    { id: "2", designation: "React" },
    { id: "3", designation: "Agile Management" },
    { id: "4", designation: "Team Leadership" },
  ],
  cvs: [
    {
      id: "1",
      name: "Alice's CV",
      age: 28,
      job: "Software Developer",
      owner: "1",
    },
    { id: "2", name: "Bob's CV", age: 34, job: "Project Manager", owner: "2" },
    {
      id: "3",
      name: "Bob's Second CV",
      age: 34,
      job: "Product Owner",
      owner: "2",
    },
  ],
  cvSkills: [
    { cvId: "1", skillId: "1" },
    { cvId: "1", skillId: "2" },
    { cvId: "2", skillId: "3" },
    { cvId: "2", skillId: "4" },
    { cvId: "3", skillId: "1" },
    { cvId: "3", skillId: "3" },
  ],
};
