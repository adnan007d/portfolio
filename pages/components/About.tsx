import React from "react";
import { techStack } from "../utils/techStacks";
import Intro from "./Intro";

import TechStack from "./TechStack";

const About = ({ className }: { className: string }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Intro />
      <div className="p-3 rounded-md flex justify-around gap-5 flex-wrap bg-[#3b3b46] max-w-[95%]">
        {techStack.map((stack, i) => (
          <TechStack key={i} title={stack.title} items={stack.items} />
        ))}
      </div>
    </div>
  );
};

export default About;
