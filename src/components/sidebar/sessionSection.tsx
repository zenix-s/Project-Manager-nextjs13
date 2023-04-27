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
        theme="transparent"
        textColor="white"
        hoverEffect="whiter"
        onClick={() => {
          signIn();
        }}
        icon={CiLogin}
        uppercase
      />
      <Button
        label="Registrarse"
        theme="transparent"
        textColor="white"
        hoverEffect="whiter"
        onClick={() => {
          console.log("Registrarse");
        }}
        icon={CiEdit}
        uppercase
      />
    </>
  );
};

const LoggedOptions = () => {
  return (
    <>
      <Button
        label="Perfil"
        theme="transparent"
        textColor="white"
        hoverEffect="whiter"
        icon={CiUser}
        onClick={() => {
          console.log("Perfil");
        }}
        uppercase={true}
      />
      <Button
        label="Cerrar Sesión"
        theme="transparent"
        textColor="white"
        hoverEffect="whiter"
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
