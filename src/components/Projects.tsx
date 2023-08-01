import React from "react";

type Project = {
  name: string;
  imageUrl: string;
  link?: string;
  githubLink?: string;
  otherLinks?: { name: string; url: string };
};

function getAllProjects(): Project[] {
  return [
    {
      name: "Optiminastic",
      imageUrl: "",
      link: "https://optiminastic.com",
      githubLink: "",
    },
  ];
}

const Projects = () => {
  const projects = getAllProjects();



  return <div>Projects</div>;
};

export default Projects;
