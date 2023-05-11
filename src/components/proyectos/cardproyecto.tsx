"use client";
import { FiMenu, FiExternalLink } from "react-icons/fi";
import { useState } from "react";
import Button from "../button";
import { useRouter } from "next/navigation";
import loadingLogo from "../../assets/svg/loading.svg";
import Image from "next/image";
import { ProjectProps } from "@/types";
import axios from "axios";

// interface CardProyectoProps {
//   name: String;
//   description: String;
//   idProyecto: String;
//   endDate?: String;
//   role?: String;
// }

const CardProyecto = ({
  id,
  name,
  description,
  endDate,
  role,
}: ProjectProps) => {
  const [visible, setVisible] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const toogleVisible = () => {
    setVisible(!visible);
  };

  const router = useRouter();

  const openProject = () => {
    router.push(`/proyectos/${id}`);
  };

  const deleteProject = async () => {
    setDeleting(true);
    const IdProyecto = id as number;
    // try {
    //   const response = await fetch("http://localhost:3000/api/proyectos", {
    //     method: "DELETE",
    //     headers: {
    //       "id-proyecto": IdProyecto.toString(),
    //     },
    //   });

    //   if (response.ok) {
    //     const result = await response.json();
    //     console.log(result);
    //     router.refresh();
    //   }
    // } catch (err) {
    //   console.error(err);
    // }
    axios.delete("/api/proyectos", {
      headers: {
        "id-proyecto": IdProyecto.toString(),
      },
    });
    router.refresh();
  };

  return (
    <div className="relative m-2 flex h-52 cursor-pointer flex-col items-start justify-between overflow-hidden rounded-xl bg-white p-4 text-black shadow-md">
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
      px-12
      py-4
      `}
      >
        <Button
          label="Editar"
          onClick={() => {}}
          theme="accent"
          disabled={role === "admin" || role === "owner" ? false : true}
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
        <div>
          <p>Role: {role}</p>
        </div>
      </div>
      <div className="">
        <p>End Date: {endDate.toDateString()}</p>
      </div>
    </div>
  );
};

export default CardProyecto;
