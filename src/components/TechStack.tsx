import { getTechStack } from "@/lib/utils";
import React from "react";

const TechStack = () => {
  const techStack = getTechStack();

  return (
    <div>
      {techStack.map((stack) => (
        <span key={stack}> {stack} </span>
      ))}
    </div>
  );
};

export default TechStack;
