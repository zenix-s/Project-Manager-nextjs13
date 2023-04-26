"use client";
import Logo from "./logo";
import {VscGraphLine} from "react-icons/vsc";
import { CiHome, CiAlignTop, CiCircleRemove } from "react-icons/ci";

import SessionSection from "./sessionSection";
import Button from "../button";
import LinkComponent from "../link";


interface AsideBarProps {
  id?: string;
}

const links = [
  {
    name: "Home",
    href: "/",
    icon: CiHome,
  },
  {
    name: "Proyectos",
    href: "/proyectos",
    icon: CiAlignTop,
  },
  {
    name: "Estidisticas",
    href: "/about",
    icon: VscGraphLine,
  },
];

const Nav = () => {
  return (
    <nav className="flex flex-col gap-1.5 p-4">
      {links.map((link, index) => (
        <LinkComponent
          key={index}
          label={link.name}
          theme="dark"
          href={link.href}
          icon={link.icon}
          trasparent={true}
          uppercase={true}
        />
      ))}
    </nav>
  );
};

const AsideBar = ({ id }: AsideBarProps) => {
  const shown = false;

  return (
    <div className=" h-full w-full p-4">
      <div className="relative flex h-full w-full flex-col justify-between overflow-scroll rounded-xl bg-slate-700">
        <div>
          <Logo />
          <Nav />
        </div>
        <SessionSection id={id ? id : undefined} />
        <div className="absolute right-0 top-0 hidden">
          <Button
            label=""
            theme="light"
            icon={CiCircleRemove}
            onClick={() => {
              console.log("click");
            }}
            trasparent={true}
            center={true}
          />
        </div>
      </div>
    </div>
  );
};

export default AsideBar;
