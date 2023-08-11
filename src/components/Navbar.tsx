import Image from "next/image";
import React from "react";
import { DarkModeSwitch } from "./DarkModeSwitch";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="flex justify-between px-4 py-2">
      <Link href="/" aria-label="Navigate to Home">
        <Image
          src="/ket.webp"
          width={48}
          height={48}
          alt="Profile Pic"
          className="rounded-full"
          priority
        />
      </Link>
      <DarkModeSwitch />
    </header>
  );
};

export default Navbar;
