import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Image from "next/image";
import ProjectTechStack from "./ProjectTechStack";
import { IProject } from "../utils/projects";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";
import { IconButton } from "@mui/material";

interface ProjectProps extends IProject {
  onDeleteProject: (id: number) => void;
}

const Project = ({
  title,
  id,
  img,
  techStack,
  github,
  liveLink,
  onDeleteProject,
}: ProjectProps) => {
  const [minimise, setMinimise] = useState(false);

  const toggleMinimise = () => {
    setMinimise(!minimise);
  };

  return (
    <div className="flex flex-col  w-[250px] relative overflow-hidden">
      <header className="p-2 flex justify-between bg-[#212529cc] rounded-t-md z-50 relative">
        <span>{title}</span>
        <div>
          <IconButton className="h-7 w-7 text-white" onClick={toggleMinimise}>
            <KeyboardArrowDownIcon
              className={`h-5 w-5 transition-all duration-300 text-white ${
                minimise && "-rotate-180"
              }`}
            />
          </IconButton>
          <IconButton
            className="h-7 w-7 text-white"
            onClick={() => onDeleteProject(id)}
          >
            <CloseIcon className="h-5 w-5 text-white" />
          </IconButton>
        </div>
      </header>

      <main
        className={`flex-1 flex flex-col transition-all p-2 bg-[#212529cc] rounded-b-md ${
          minimise && "-translate-y-[calc(100%+100px)] absolute"
        }`}
      >
        <div className="flex justify-center">
          <Image
            src={img}
            alt="Project Image"
            width={200}
            height={150}
            objectFit="contain"
          />
        </div>
        <div className="space-y-4 mt-2 flex-1">
          {techStack.map((stack, i) => (
            <ProjectTechStack key={i} title={stack.title} items={stack.items} />
          ))}
        </div>
        <div className="flex justify-around mt-3 relative">
          {github && (
            <a target="_blank" rel="noreferrer" href={github}>
              <GitHubIcon className="text-white icon hover:text-[#9c8e9c]" />
            </a>
          )}
          {liveLink && (
            <a target="_blank" rel="noreferrer" href={liveLink}>
              <LanguageIcon className="text-white icon hover:text-cyan-500" />
            </a>
          )}
        </div>
      </main>
    </div>
  );
};

export default Project;
