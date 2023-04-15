"use client";
import SessionButton from "./sessionbutton";
import UserSectionButton from "./usersection";

import { signIn, signOut } from "next-auth/react";

import loginicon from "../../assets/svg/login.svg";
import registericon from "../../assets/svg/registro.svg";
import { BiLogOut } from "react-icons/bi";
import { CiUser } from "react-icons/ci";

import { useState } from "react";

interface logSessionProps {
  id?: string;
}

const SessionOptions = () => {
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
          console.log("Registrarse");
        }}
        icon={registericon}
      />
    </div>
  );
};

const LoggedOptions = () => {
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
          signOut();
        }}
      />
    </div>
  );
};

const LogSection: React.FC<logSessionProps> = ({ id }) => {
  const [user, setUser] = useState(id);
  return <>{user ? <LoggedOptions /> : <SessionOptions />}</>;
};

export default LogSection;
