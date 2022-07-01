import { StaticImageData } from "next/image";
import React from "react";
import Language from "./Language";

interface ITechStack {
  title: string;
  items: { icon: StaticImageData; name: string }[];
}

const TechStack = ({ title, items }: ITechStack) => {
  return (
    <div className="mx-5">
      <span className="text-xl font-bold text-[#fdffb6]">{title}</span>
      <div className="space-y-2 mt-2 text-[#85e3ff]">
        {items.map((lang, i) => (
          <Language key={i} Icon={lang.icon} name={lang.name} />
        ))}
      </div>
    </div>
  );
};

export default TechStack;
