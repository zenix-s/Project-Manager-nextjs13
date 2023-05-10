"use client";

import { signIn, signOut } from "next-auth/react";

import { useState } from "react";
import { CiLogin, CiLogout, CiEdit, CiUser } from "react-icons/ci";
import { UserProps } from "@/types";

import Button from "../button";

interface logSessionProps {
  user?: UserProps;
}

const SessionOptions = () => {
  return (
    <>
      <Button
        label="Iniciar Sesión"
        theme="ghost"
        onClick={() => {
          signIn();
        }}
        icon={CiLogin}
      />
      <Button
        label="Registrarse"
        theme="ghost"
        onClick={() => {
          console.log("Registrarse");
        }}
        icon={CiEdit}
      />
    </>
  );
};

const LoggedOptions = () => {
  return (
    <>
      <Button
        label="Perfil"
        theme="ghost"
        icon={CiUser}
        onClick={() => {
          console.log("Perfil");
        }}
      />
      <Button
        label="Cerrar Sesión"
        theme="ghost"
        icon={CiLogout}
        onClick={() => {
          signOut();
        }}
      />
    </>
  );
};

const SessionSection: React.FC<logSessionProps> = (
  { user }
) => {
  return (
    <div className="flex flex-col gap-1.5 border-t border-white/50 p-4">
      {user ? <LoggedOptions /> : <SessionOptions />}
    </div>
  );
};

export default SessionSection;
