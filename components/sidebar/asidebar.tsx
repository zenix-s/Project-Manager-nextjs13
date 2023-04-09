"use client";
import Image from "next/image";
import Link from "next/link";
import Logo from "./logo";
import homeicon from "../../assets/svg/home.svg";
import tasksicon from "../../assets/svg/task.svg";
import proyectoicon from "../../assets/svg/proyecto.svg";
import loginicon from "../../assets/svg/login.svg";
import registericon from "../../assets/svg/registro.svg";
import SessionButton from "./sessionbutton";
import SidebarActionButton from "../sidebar-action-button";
import { BiArrowFromRight } from "react-icons/bi";
import { BiColumns } from "react-icons/bi";
import {BiLogOut } from "react-icons/bi";
import {CiUser } from "react-icons/ci";
import { SlClose } from "react-icons/sl";
import "../../styles/asidebar.css";
import UserSectionButton from "./usersection";
import { useState } from "react";

import { signIn, signOut, useSession } from "next-auth/react";

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

function NavItem({ name, href, icon }) {
  return (
    <div className="nav-item">
      <Link href={href}>
        <Image src={icon} alt={name} width={20} height={20} />
        <span>{name}</span>
      </Link>
    </div>
  );
}

function Nav() {
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
}

function SessionOptions() {
  return (
    <div className="nav-container session-options">
      <SessionButton
        label="Iniciar Sesión"
        onClick={() => {
          signIn();
        }}
        icon={loginicon}
      />
      <SessionButton
        label="Registrarse"
        onClick={() => {
          signOut();
        }}
        icon={registericon}
      />
    </div>
  );
}

function LoggedOptions() {
  return (
    <div className="nav-container session-options">
      <UserSectionButton
        name="Perfil"
        icon={CiUser}
        onclick={() => {
          console.log("Perfil");
        }}
      />
      <UserSectionButton
        name="Cerrar Sesión"
        icon={BiLogOut}
        onclick={() => {
          console.log("Cerrar Sesión");
        }}
      />
    </div>
  );
}

export default function AsideBar() {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <aside id="sidebar">
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
        {isLogged ? <LoggedOptions /> : <SessionOptions />}
      </div>
    </aside>
  );
}
