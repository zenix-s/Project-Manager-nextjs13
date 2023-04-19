"use client";
import Logo from "./logo";

import { SlClose } from "react-icons/sl";
import { CiHome, CiCircleInfo, CiAlignTop } from "react-icons/ci";

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
    name: "About",
    href: "/about",
    icon: CiCircleInfo,
  },
  {
    name: "Proyectos",
    href: "/proyectos",
    icon: CiAlignTop,
  },
];

const Nav = () => {
  return (
    <nav className="flex flex-col gap-1.5 p-4">
      {links.map((link, index) => (
        <LinkComponent
          key={index}
          label={link.name}
          theme="light"
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
    <aside
      className={`
      fixed left-0 top-0 h-full w-full bg-transparent p-4 transition-transform duration-200 ease-in-out sm:w-80
      ${shown ? "translate-x-0 transform" : "-translate-x-full transform"}
      md:translate-x-0
    `}
    >
      <div className="flex h-full w-full flex-col justify-between overflow-scroll rounded-xl bg-slate-700 relative">
        <div>
          <Logo />
          <Nav />
        </div>
        <SessionSection id={id ? id : undefined} />
        <div className="absolute right-0 top-0">
          <Button
            label=""
            theme="light"
            icon={SlClose}
            onClick={() => {
              console.log("click");
            }}
            trasparent={true}
            center={true}
          />
        </div>
      </div>
    </aside>
  );
};

export default AsideBar;
