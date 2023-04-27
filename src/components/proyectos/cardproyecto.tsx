"use client";
import { FiMenu, FiExternalLink } from "react-icons/fi";
import { useState } from "react";
import Button from "../button";
import { useRouter } from "next/navigation";

interface CardProyectoProps {
  name: String;
  description: String;
  idProyecto: String;
  rol: String;
  endDate?: String;
}

const CardProyecto = ({
  name,
  description,
  endDate,
  rol,
  idProyecto,
}: CardProyectoProps) => {
  const [visible, setVisible] = useState(false);

  const toogleVisible = () => {
    setVisible(!visible);
  };

  const router = useRouter();

  const openProject = () => {
    router.push(`/proyectos/${idProyecto}`);
  };

  const deleteProject = async () => {
    const IdProyecto = idProyecto as string;
    try {
      const response = await fetch("http://localhost:3000/api/proyectos", {
        method: 'DELETE',
        headers: {
          'id-proyecto': IdProyecto,
        }
      });
    
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative m-2 flex h-52 cursor-pointer flex-col items-start justify-between overflow-hidden rounded-xl bg-white p-4 shadow-md">
      <button
        className=" absolute right-4 top-4 z-10"
        onClick={() => toogleVisible()}
      >
        <FiMenu size={24} />
      </button>

      <div className="absolute bottom-0 right-0">
        <Button
          label=""
          theme="light"
          trasparent
          onClick={() => openProject()}
          icon={FiExternalLink}
          center
        />
      </div>

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
      bg-white
      p-4
      `}
      >
        <Button
          label="Editar"
          onClick={() => {}}
          theme="light"
          center
          shadow

        />
        <Button
          label="Eliminar"
          onClick={() => {
            deleteProject();
          }}
          theme="light"
          shadow
          center
        />
      </div>
      <div className="">
        <h3>{name}</h3>
        <p>{description}</p>
        <p>{rol}</p>
      </div>
      <div className="">
        <p>End Date: {endDate}</p>
      </div>
    </div>
  );
};

export default CardProyecto;
