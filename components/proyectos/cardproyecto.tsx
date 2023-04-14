"use client";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import Button from "../button";
import axios from "axios";

interface CardProyectoProps {
  name: String;
  description: String;
  idProyecto: String;
  endDate?: String;
}

const CardProyecto = ({
  name,
  description,
  endDate,
  idProyecto,
}: CardProyectoProps) => {
  const [visible, setVisible] = useState(false);

  const toogleVisible = () => {
    setVisible(!visible);
  };

  const deleteProject = async () => {
    const res = await axios
      .delete(`/api/proyectos`, {
        data: {
          idProyecto: idProyecto,
        },
      })
      .then(() => {
        console.log("Proyecto eliminado");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("Finalizado");
      });
  };

  return (
    <a
      className="
      relative
      m-2
      flex
      h-52
      w-full
      max-w-md
      flex-col
      justify-between
      overflow-hidden
      rounded-xl
      bg-white
      p-4
      shadow-md
    "
      href="#"
    >
      <button
        className="
        absolute
        right-4
        top-4
        z-10
      "
        onClick={() => toogleVisible()}
      >
        <FiMenu size={24} color={visible ? "white" : "black"} />
      </button>
      <div
        className={`
      ${visible ? "flex" : "hidden"}
      absolute
      left-0
      top-0
      h-full
      w-full
      flex-col
      justify-center
      gap-2
      bg-neutral-800
      p-4
      `}
      >
        <Button text="Editar" onClick={() => {}} theme="dark" />
        <Button text="Eliminar" onClick={() => {
          deleteProject();
        }} theme="dark" />
      </div>
      <div className="">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
      <div className="">
        <p>Fecha de finalización: {endDate}</p>
      </div>
    </a>
  );
};

export default CardProyecto;