import Image, { StaticImageData } from "next/image";
import React from "react";
import { IProjectTechStack } from "../utils/projects";

const ProjectTechStack = ({ title, items }: IProjectTechStack) => {
  return (
    <div className="flex items-center space-x-2">
      <span>{title}:</span>
      <div className="flex items-center gap-1">
        {items.map((icon, i) => (
          <Image
            key={i}
            src={icon}
            alt="lang"
            width={30}
            height={30}
            objectFit="contain"
            className="rounded-full"
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectTechStack;
