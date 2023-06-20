"use client";
import { FiMenu, FiExternalLink } from "react-icons/fi";
import { useState } from "react";
import Button from "../button";
import { useRouter } from "next/navigation";
import loadingLogo from "../../assets/svg/loading.svg";
import Image from "next/image";
import { ProjectProps } from "@/types";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import LinkComponent from "../link";
import { BiEdit } from "react-icons/bi";
import { VscInbox } from "react-icons/vsc";
import { BsArchive } from "react-icons/bs";

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
  archived,
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

  const deleteProject = async (
    action: "archive" | "unarchive" | "delete" = "archive"
  ) => {
    setDeleting(true);
    const IdProyecto = id as number;
    axios
      .delete("/api/proyectos", {
        headers: {
          "id-proyecto": IdProyecto.toString(),
          action: action,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          toast.success(res.data.message);
        }
        if (res.data.status === 403) {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {})
      .finally(() => {
        setDeleting(false);
        router.refresh();
      });
  };

  return (
    <div className="relative m-2 flex h-52 cursor-pointer flex-col items-start justify-between rounded-xl border border-white/20 p-4 text-white/90 shadow-md">
      <div
        className={`
      ${isDeleting ? "flex" : "hidden"} 
      text-dark absolute left-0 top-0 h-full w-full items-center  justify-center bg-base-100`}
      >
        <Image src={loadingLogo} alt="Loading..." width={100} height={100} />
      </div>
      <div className="absolute bottom-2 right-2 z-10 ">
        <Link href={`/proyectos/${id}`} className="btn-ghost btn">
          <FiExternalLink />
        </Link>
      </div>

      <div className={`dropdown-end dropdown absolute right-2 top-2`}>
        <label tabIndex={0} className="btn-ghost btn">
          <FiMenu />
        </label>

        <ul className="dropdown-content menu flex w-52 flex-col rounded-md border border-white/30 bg-base-100">
          {role === "admin" ||
            (role === "owner" && (
              <li>
                <button onClick={() => {}}>
                  <span>
                    <BiEdit />
                  </span>
                  <span>Editar</span>
                </button>
              </li>
            ))}
          {role === "admin" ||
            (role === "owner" && (
              <li>
                <button
                  onClick={() => {
                    deleteProject(archived === true ? "unarchive" : "archive");
                  }}
                >
                  <span>
                    <BsArchive />
                  </span>
                  <span>{archived === true ? "Desarchivar" : "Archivar"}</span>
                </button>
              </li>
            ))}
          <li>
            <Link href={`/proyectos/${id}`} className="">
              <span>
                <FiExternalLink />
              </span>
              <span>Ver</span>
            </Link>
          </li>
          {(role === "owner" && archived) &&  (
            <li>
              <Button
                label="Eliminar"
                theme="error"
                onClick={() => {
                  deleteProject("delete");
                }}
              />
            </li>
          )}
        </ul>
      </div>
      <div className="w-full">
        <h3 className="text-xl">{name}</h3>
        <p className="text-md w-full">{description}</p>
        <div>
          <p>Role: {role}</p>
        </div>
      </div>
      {endDate && (
        <div className="">
          <p>End Date: {endDate.toLocaleDateString("es-ES")}</p>
        </div>
      )}
    </div>
  );
};

export default CardProyecto;
