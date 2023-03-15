import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between">
      <Image
        src="/ket.webp"
        width={48}
        height={48}
        alt="Profile Pic"
        className="rounded-full"
        priority
      />
    </div>
  );
};

export default Navbar;
