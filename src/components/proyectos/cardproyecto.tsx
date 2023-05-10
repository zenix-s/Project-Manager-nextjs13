"use client";
import { FiMenu, FiExternalLink } from "react-icons/fi";
import { useState } from "react";
import Button from "../button";
import { useRouter } from "next/navigation";
import loadingLogo from "../../assets/svg/loading.svg";
import Image from "next/image";

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
  const [isDeleting, setDeleting] = useState(false);

  const toogleVisible = () => {
    setVisible(!visible);
  };

  const router = useRouter();

  const openProject = () => {
    router.push(`/proyectos/${idProyecto}`);
  };

  const deleteProject = async () => {
    setDeleting(true);
    const IdProyecto = idProyecto as string;
    try {
      const response = await fetch("http://localhost:3000/api/proyectos", {
        method: "DELETE",
        headers: {
          "id-proyecto": IdProyecto,
        },
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
    <div className="relative m-2 flex h-52 cursor-pointer flex-col items-start justify-between overflow-hidden rounded-xl bg-white p-4 shadow-md text-black">
      <div
        className={`
      ${isDeleting ? "flex" : "hidden"} 
      text-dark absolute left-0 top-0 h-full w-full items-center  justify-center bg-white`}
      >
        <Image src={loadingLogo} alt="Loading..." width={100} height={100} />
      </div>
      <div className="absolute right-0 top-0 z-10 ">
        <Button
          theme="ghost"
          icon={FiMenu}
          onClick={() => toogleVisible()}
          disabled={isDeleting}
        />
      </div>

      <div
        className={`${
          isDeleting ? "hidden" : "flex"
        } absolute bottom-0 right-0`}
      >
        <Button
          label=""
          theme="ghost"
          onClick={() => openProject()}
          icon={FiExternalLink}
        />
      </div>

      <div
        className={`
      ${visible ? "flex" : "hidden"}
      ${isDeleting ? "hidden" : "flex"}
      absolute
      left-0
      top-0
      h-full
      w-full
      flex-col
      justify-center
      gap-2
      bg-white
      py-4
      px-12
      `}
      >
        <Button
          label="Editar"
          onClick={() => {}}
          theme="accent"
        />
        <Button
          label="Eliminar"
          onClick={() => {
            deleteProject();
          }}
          theme="accent"
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
