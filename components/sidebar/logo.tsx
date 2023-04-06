'use client';
import Image from "next/image";
import logo from "../../assets/svg/logonobg.svg";


function Logo() {
  return (
    <div className="logo">
      <div className="logo-img">
        <Image src={logo} alt="Logo" width={50} height={50} />
      </div>
      <h1>Varbas</h1>
    </div>
  );
}

export default Logo;