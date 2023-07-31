import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTechStack() {
  return [
    "Node.js",
    "Typescript",
    "Next.js",
    "React.js",
    "SQL",
    "Python",
    "C++",
  ];
}
