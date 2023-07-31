import { getTechStack } from "@/lib/utils";
import React from "react";

const TechStack = () => {
  const techStack = getTechStack();

  return (
    <>
      <h3
        className="text-5xl font-black text-center my-5"
        aria-label="Tech Stack"
      >
        Arsenal
      </h3>
      <div className="flex items-center gap-5">
        {techStack.map((stack) => (
          <span
            className="px-4 py-2 rounded-md font-bold text-xl bg-secondary text-white"
            key={stack}
          >
            {stack}
          </span>
        ))}
      </div>
    </>
  );
};

export default TechStack;
