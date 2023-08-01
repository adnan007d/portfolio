import { cn, generateTilt, getTechStack } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const Arsenal = () => {
  const techStack = getTechStack();

  return (
    <>
      <h3
        className="text-5xl font-black text-center my-5 mb-10"
        aria-label="Tech Stack"
      >
        Arsenal
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-8">
        {techStack.map((stack) => (
          <div
            key={stack.name}
            data-stack-name={stack.name}
            className={cn(
              "p-2 bg-white rounded-full relative",
              "before:content-[attr(data-stack-name)]",
              "before:absolute before:bg-white before:text-secondary before:font-bold before:p-1",
              "before:mx-auto before:left-0 before:right-0 before:-top-8 before:rounded-md before:w-max ",
              "before:opacity-0 before:scale-50 before:duration-300 before:transition-all ",
              "hover:cursor-pointer hover:before:scale-100  hover:before:opacity-100"
            )}
            style={{ ...generateTilt() }}
          >
            <div className="rounded-full relative w-14 aspect-square">
              <Image
                key={stack.name}
                src={stack.image}
                fill
                alt={`${stack} logo`}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Arsenal;
