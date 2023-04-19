"use client";
import Image from "next/image";
import logo from "../../assets/svg/logonobg.svg";

const Logo = () => {
  return (
    <div className="flex w-full items-center justify-center border-b border-solid border-white/50 px-4 py-6">
      <div className="">
        <Image src={logo} alt="Logo" width={50} height={50} />
      </div>
      <h1 className="ml-2 text-3xl font-normal uppercase tracking-wider text-white">
        Varbas
      </h1>
    </div>
  );
};

export default Logo;
