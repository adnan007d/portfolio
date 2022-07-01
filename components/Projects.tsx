import React, { useState } from "react";
import { projects } from "../utils/projects";

import Project from "./Project";

const Projects = ({ className }: { className: string }) => {
  const [filterProjects, setFilterProjects] = useState(projects);

  const onDeleteProject = (id: number) => {
    setFilterProjects(filterProjects.filter((project) => project.id !== id));
  };

  return (
    <div className={`${className}`}>
      <div className="flex flex-col items-center">
        <h3 className="text-3xl text-[#9ADCFF]">
          All Projects on{" "}
          <a
            className="text-gray-500 hover:text-cyan-600"
            href="https://github.com/adnan007d"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </h3>

        <div className="mt-5 bg-[#353339] p-4 rounded-md max-w-[90%] flex flex-wrap gap-5 justify-center">
          {filterProjects.map((project) => (
            <Project
              key={project.id}
              id={project.id}
              title={project.title}
              img={project.img}
              techStack={project.techStack}
              github={project.github}
              liveLink={project.liveLink}
              onDeleteProject={onDeleteProject}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
