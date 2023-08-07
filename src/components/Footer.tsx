import React from "react";
import { Icons } from "./ui";

const Footer = () => {
  return (
    <div className="flex flex-wrap gap-5 items-center justify-center py-5">
      <Icons.github className="w-10 aspect-square" />
      <Icons.mail className="w-10 aspect-square" />
      <Icons.x className="w-8 aspect-square" />
    </div>
  );
};

export default Footer;
