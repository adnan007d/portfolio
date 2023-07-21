import Image from "next/image";
import React from "react";
import { DarkModeSwitch } from "./DarkModeSwitch";

const Navbar = () => {
  return (
    <header className="flex justify-between px-4 py-2">
      <Image
        src="/ket.webp"
        width={48}
        height={48}
        alt="Profile Pic"
        className="rounded-full"
        priority
      />
      <DarkModeSwitch />
    </header>
  );
};

export default Navbar;
