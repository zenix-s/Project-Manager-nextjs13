"use client";
import Logo from "./logo";
import { VscGraphLine } from "react-icons/vsc";
import { CiHome, CiAlignTop, CiCircleRemove } from "react-icons/ci";

import SessionSection from "./sessionSection";
import Button from "../button";
import { NavBarLinkProps } from "@/types";
import useAside from "@/hooks/useAside";
import { UserProps } from "@/types";
import Nav from "./NavBar";
import { useState } from "react";
interface AsideBarProps {
  id?: string;
}

const links: NavBarLinkProps[] = [
  {
    label: "Home",
    href: "/",
    icon: CiHome,
  },
  {
    label: "Proyectos",
    href: "/proyectos",
    icon: CiAlignTop,
  },
  {
    label: "Estidisticas",
    href: "/estadisticas",
    icon: VscGraphLine,
  },
];

const AsideBar = ({ user }: { user: any }) => {
  const aside = useAside();
  const [selected, setSelected] = useState("Home");
  return (
    <aside
      className={`z-50 ${
        aside.isOpen ? "absolute" : "hidden"
      } h-screen w-screen lg:relative  lg:flex lg:w-1/2 lg:min-w-[330px] lg:max-w-[400px] xl:w-1/4`}
    >
      <div className=" h-full w-full p-4">
        <div className="relative flex h-full w-full flex-col justify-between overflow-scroll rounded-xl bg-slate-700">
          <div>
            <Logo />
            <Nav links={links} />
          </div>
          <SessionSection user={user} />
          <div className={`absolute right-0 top-0 flex lg:hidden  `}>
            <Button
              theme="ghost"
              icon={CiCircleRemove}
              onClick={() => {
                aside.onClose();
              }}
              center
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AsideBar;
