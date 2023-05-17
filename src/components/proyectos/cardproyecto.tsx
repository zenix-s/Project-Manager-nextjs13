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
          toast.success(
            res.data.message
          );
        }
        if (res.data.status === 403) {
          toast.error(
            res.data.message
          );
        }

      })
      .catch((err) => {})
      .finally(() => {
        setDeleting(false);
        router.refresh();
      });
  };

  return (
    <div className="relative m-2 flex h-52 cursor-pointer flex-col items-start justify-between rounded-xl bg-white p-4 text-black shadow-md">
      <div
        className={`
      ${isDeleting ? "flex" : "hidden"} 
      text-dark absolute left-0 top-0 h-full w-full items-center  justify-center bg-white`}
      >
        <Image src={loadingLogo} alt="Loading..." width={100} height={100} />
      </div>
      <div className="absolute right-0 bottom-0 z-10 ">
        <Link 
          href={`/proyectos/${id}`}
          className="btn-ghost btn"
        >
          <FiExternalLink />
        </Link>
      </div>

      <div className={`dropdown absolute top-0 right-0`}>
        <label tabIndex={0} className="btn-ghost btn">
          <FiMenu />
        </label>

        <ul className="dropdown-content menu flex flex-col gap-2 p-4 w-52 bg-slate-400 rounded-lg">
          <li>
            <Button
              label="Editar"
              onClick={() => {}}
              theme="accent"
              disabled={role === "admin" || role === "owner" ? false : true}
            />
          </li>
          <li>
            <Button
              label={archived === true ? "Desarchivar" : "Archivar"}
              onClick={() => {
                deleteProject(
                  archived === true ? "unarchive" : "archive"
                );
              }}
              theme="accent"
            />
          </li>
        </ul>
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
      <div>
        <p>
          archived:
          {archived === true ? "true" : "false"}
        </p>
      </div>
    </div>
  );
};

export default CardProyecto;
