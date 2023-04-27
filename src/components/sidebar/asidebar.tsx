"use client";
import Logo from "./logo";
import { VscGraphLine } from "react-icons/vsc";
import { CiHome, CiAlignTop, CiCircleRemove } from "react-icons/ci";

import SessionSection from "./sessionSection";
import Button from "../button";
import LinkComponent from "../link";

import useAside from "@/hooks/useAside";

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
  {
    name: "Mockups",
    href: "/mockups",
    icon: VscGraphLine,
  }
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
  const aside = useAside();

  return (
    <aside className={`z-50 ${aside.isOpen ? "absolute" : "hidden"} h-screen w-screen lg:relative  lg:flex lg:w-1/2 lg:min-w-[330px] lg:max-w-[400px] xl:w-1/4`}>
      <div className=" h-full w-full p-4">
        <div className="relative flex h-full w-full flex-col justify-between overflow-scroll rounded-xl bg-slate-700">
          <div>
            <Logo />
            <Nav />
          </div>
          <SessionSection id={id ? id : undefined} />
          <div className={`absolute right-0 top-0 flex lg:hidden  `}>
            <Button
              label=""
              theme="dark"
              icon={CiCircleRemove}
              onClick={() => {
                aside.onClose();
              }}
              trasparent
              center
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AsideBar;
