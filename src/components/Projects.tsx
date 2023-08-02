import React from "react";
import fs from "fs";

type Project = {
  name: string;
  imageUrl: string;
  link?: string;
  githubLink?: string;
  otherLinks?: { name: string; url: string };
};

async function getAllProjects(): Promise<Project[]> {
  /*
   * Maybe change this to a raw for loop is there are performance issues later
   */
  const files = fs
    .readdirSync("src/projects/")
    .filter((file) => file.endsWith(".mdx"));

  const metas: Project[] = await Promise.all(
    files.map((file) =>
      import(`@/projects/${file}`).then((module) => module.meta)
    )
  );

  return metas;
}

const Projects = async () => {
  const projects = await getAllProjects();
  console.log(projects);
  return <div>Projects</div>;
};

export default Projects;
