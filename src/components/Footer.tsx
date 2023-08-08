import React from "react";
import { Icons } from "./ui/icons";

const Footer = () => {
  return (
    <div className="flex flex-wrap gap-5 items-center justify-center py-5">
      <a
        href="https://github.com/adnan007d"
        target="_blank"
        rel="noreferrer noopener"
        className="hover:scale-110 transition duration-150 ease-in-out"
        aria-label="Github Link"
      >
        <Icons.github className="w-10 aspect-square" />
      </a>
      <a
        href="mailto:adnanmansuri54@gmail.com"
        target="_blank"
        rel="noreferrer noopener"
        className="hover:scale-110 transition duration-150 ease-in-out"
        aria-label="Mail Link"
      >
        <Icons.mail className="w-10 aspect-square" />
      </a>
      <a
        href="https://twitter.com/adnan007d"
        target="_blank"
        rel="noreferrer noopener"
        className="hover:scale-110 transition duration-150 ease-in-out"
        aria-label="Twitter Link"
      >
        <Icons.x className="w-8 aspect-square" />
      </a>
    </div>
  );
};

export default Footer;
