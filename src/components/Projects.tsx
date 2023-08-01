import React from "react";
import Optiminastic, {meta} from "@/projects/optiminastic.mdx";
import fs from "fs";

type Project = {
  name: string;
  imageUrl: string;
  link?: string;
  githubLink?: string;
  otherLinks?: { name: string; url: string };
};

// async function getAllProjects(): Promise<Project[]> {
//
//   /*
//    * Maybe change this to a raw for loop is there are performance issues later
//    */
//   const files = fs.readdirSync("src/projects/").filter(file => file.endsWith(".mdx"));
//
//   console.log(files);
//
//   // const metas: Project[] = await Promise.all(files.map(file => import(`@/projects/${file}`)));
//   // console.log(metas)
//   //
//   // return metas
// }

const Projects = () => {
  // const projects = getAllProjects();
  // console.log(projects);
  console.log(meta)

  return <div>Projects</div>;
};

export default Projects;
