"use client";
import Image from "next/image";
import Link from "next/link";
import Logo from "./logo";
import homeicon from "../../assets/svg/home.svg";
import tasksicon from "../../assets/svg/task.svg";
import proyectoicon from "../../assets/svg/proyecto.svg";
import SidebarActionButton from "../sidebar-action-button";
import { SlClose } from "react-icons/sl";
import "@/styles/asidebar.css";

import LogSection from "./logsection";

interface AsideBarProps {
  id?: string;
}

const links = [
  {
    name: "Home",
    href: "/",
    icon: homeicon,
  },
  {
    name: "About",
    href: "/about",
    icon: tasksicon,
  },
  {
    name: "Proyectos",
    href: "/proyectos",
    icon: proyectoicon,
  },
];

const NavItem = ({ name, href, icon }: any) => {
  return (
    <div className="nav-item">
      <Link href={href}>
        <Image src={icon} alt={name} width={20} height={20} />
        <span>{name}</span>
      </Link>
    </div>
  );
};

const Nav = () => {
  return (
    <nav className="nav-container">
      {links.map((link, index) => (
        <NavItem
          key={index}
          name={link.name}
          href={link.href}
          icon={link.icon}
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
      xl:translate-x-0 
    `}
    >
      <SidebarActionButton
        icon={SlClose}
        onClick={() => {
          const sidebar = document.getElementById("sidebar");
          sidebar?.classList.toggle("show-aside");
        }}
      />
      <div className="aside-container">
        <div>
          <Logo />
          <Nav />
        </div>
        <LogSection id={id ? id : undefined} />
      </div>
    </aside>
  );
};

export default AsideBar;
