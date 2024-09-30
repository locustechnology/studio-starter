import React from 'react';
import Image from 'next/image';
import ban from "@/public/ban.svg";

const HeadshotContainer = () => {
  return (
    <div className="w-full max-w-[1276px] mx-auto">
      <Image
        src={ban}
        alt="Banner"
        width={1276}
        height={459}
        layout="responsive"
        objectFit="cover"
      />
    </div>
  );
};

export default HeadshotContainer;