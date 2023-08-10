import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTechStack() {
  return [
    { name: "Node.js", image: "/logos/nodejs.svg" },
    { name: "Typescript", image: "/logos/typescript.svg" },
    { name: "Next.js", image: "/logos/nextjs.svg" },
    { name: "React.js", image: "/logos/react.svg" },
    { name: "SQL", image: "/logos/sql.svg" },
    { name: "Python", image: "/logos/python.svg" },
    { name: "C++", image: "/logos/cpp.svg" },
    { name: "Golang", image: "/logos/golang.svg" },
    { name: "Git", image: "/logos/git.svg" },
    { name: "Linux", image: "/logos/linux.svg" },
    { name: "MongoDB", image: "/logos/mongo.svg" },
    { name: "Neovim", image: "/logos/nvim.svg" },
    { name: "Tailwind CSS", image: "/logos/tailwindcss.svg" },
  ];
}

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateTilt() {
  const translateXYLowerLimit = -10;
  const translateXYUpperLimit = 10;
  const rotateLowerLimit = -20;
  const rotateUpperLimit = 20;

  const translateX = getRandomInt(translateXYLowerLimit, translateXYUpperLimit);
  const translateY = getRandomInt(translateXYLowerLimit, translateXYUpperLimit);

  const rotate = getRandomInt(rotateLowerLimit, rotateUpperLimit);

  return {
    translate: `${translateX}px ${translateY}px`,
    rotate: `${rotate}deg`,
  };
}

