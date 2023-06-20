"use client";
import Logo from "./logo";
import { VscGraphLine } from "react-icons/vsc";
import {
  CiHome,
  CiAlignTop,
  CiCircleRemove,
  CiBellOn,
  CiUser,
  CiLogout,
} from "react-icons/ci";
import Button from "../button";
import { NavBarLinkProps } from "@/types";
import useAside from "@/hooks/useAside";
import Nav from "./NavBar";
import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
interface AsideBarProps {
  id?: string;
}

const links: NavBarLinkProps[] = [
  // {
  //   label: "Home",
  //   href: "/",
  //   icon: CiHome,
  // },
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
  {
    label: "Notificaciones",
    href: "/notificaciones",
    icon: CiBellOn,
  },
];

const AsideBar = ({ user }: { user: any }) => {
  const aside = useAside();
  return (
    <aside
      className={`
      z-50 
      ${aside.isOpen ? "absolute" : "hidden"} 
      h-screen w-screen sm:relative sm:flex sm:w-min`}
    >
      <div className=" h-full w-full p-2">
        <div className="relative flex h-full w-full flex-col justify-between rounded-xl bg-slate-700">
          <div>
            <Logo />
            <Nav links={links} />
          </div>
          <div className="flex flex-col gap-1.5 border-t border-white/50 p-2">
            <div
              className="tooltip tooltip-right"
              data-tip={user?.name || "Usuario"}
            >
              <Link
                href="/perfil"
                className="btn-ghost tooltip tooltip-right btn flex gap-2 text-lg justify-center items-center"
                data-tip={user?.name || "Usuario"}
              >
                <span>
                  <CiUser />
                </span>
                <span className="block sm:hidden">
                  {user?.name || "Usuario"}
                </span>
              </Link>
            </div>
            <div className="tooltip tooltip-right" data-tip="Cerrar sesion">
              <button 
                className="w-full btn btn-ghost text-lg flex gap-2 justify-center tooltip tooltip-right items-center"
                data-tip="Cerrar sesion"
                onClick={() => {
                  signOut();
                }}
              >
                <span>
                  <CiLogout />
                </span>
                <span className="block sm:hidden">
                  Cerrar sesion
                </span>
              </button>
            </div>
          </div>
          <div className={`absolute right-0 top-0 flex sm:hidden  `}>
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
