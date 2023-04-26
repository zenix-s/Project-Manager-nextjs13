"use client";

import { signIn, signOut } from "next-auth/react";

import { useState } from "react";
import { CiLogin, CiLogout, CiEdit, CiUser } from "react-icons/ci";

import Button from "../button";

interface logSessionProps {
  id?: string;
}

const SessionOptions = () => {
  return (
    <>
      <Button
        label="Iniciar Sesión"
        theme="dark"
        trasparent={true}
        onClick={() => {
          signIn();
        }}
        icon={CiLogin}
        uppercase={true}
      />
      <Button
        label="Registrarse"
        theme="dark"
        trasparent={true}
        onClick={() => {
          console.log("Registrarse");
        }}
        icon={CiEdit}
        uppercase={true}
      />
    </>
  );
};

const LoggedOptions = () => {
  return (
    <>
      <Button
        label="Perfil"
        theme="dark"
        trasparent
        icon={CiUser}
        onClick={() => {
          console.log("Perfil");
        }}
        uppercase={true}
      />
      <Button
        label="Cerrar Sesión"
        theme="dark"
        trasparent
        icon={CiLogout}
        onClick={() => {
          signOut();
        }}
        uppercase={true}
      />
    </>
  );
};

const SessionSection: React.FC<logSessionProps> = ({ id }) => {
  const [user, setUser] = useState(id);
  return (
    <div className="flex flex-col gap-1.5 border-t border-white/50 p-4">
      {user ? <LoggedOptions /> : <SessionOptions />}
    </div>
  );
};

export default SessionSection;
