import Image from "next/image";
import React from "react";
import Ket from "../assets/ket.png";
const NavBar = () => {
  return (
    <div className="p-2 bg-[#1f2222a6] shadow-sm shadow-gray-600">
      <div className="flex items-center space-x-2">
        <Image
          src={Ket}
          loading="lazy"
          alt="logo"
          className="rounded-full"
          width={42}
          height={42}
          objectFit="contain"
        />
        <span className="text-lg">Adnan</span>
      </div>
    </div>
  );
};

export default NavBar;
