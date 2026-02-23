import * as React from "react";
import Image from "next/image";
import Logo from "@/images/logo.png";
const Line: React.FC = () => (
  <div className=" lg:h-px h-0.5 lg:border-2 border border-solid bg-[#C5C5C5] border-[#C5C5C5] flex-1" />
);

const Divider: React.FC = () => {
  return (
    <div className="relative w-full pt-10 bg-white lg:py-10 z-20">
      <div className="mx-auto flex items-center w-[85%]">
        <Line />
        <div className="mx-5">
          <Image src={Logo} alt="logo" className="w-20 object-contain" />
        </div>
        <Line />
      </div>
    </div>
  );
};

export default Divider;
