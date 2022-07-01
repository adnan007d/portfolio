import Image, { StaticImageData } from "next/image";
import React from "react";

const Language = ({ Icon, name }: { Icon: StaticImageData; name: string }) => {
  return (
    <div className="flex items-center space-x-2">
      <Image
        src={Icon}
        height={39}
        width={39}
        objectFit="contain"
        alt={name}
        className="rounded-full"
      />
      <span className="text-lg">{name}</span>
    </div>
  );
};

export default Language;
