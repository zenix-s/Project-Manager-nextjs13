"use client";
import { useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import prisma from "../../lib/prismadb";
import axios from "axios";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

interface newProjectFormProps {
  visible: boolean;
}

const NewProjectForm: React.FC<newProjectFormProps> = ({ visible }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      deadline: "",
    },
  });

  const [visibility, setVisibility] = useState(visible);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await axios
      .post("/api/proyectos", data)
      .then(() => {
        console.log("Proyecto creado");
        setVisibility(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("Finalizado");
        console.log(data);
      });
  };

  return (
    <>
      <div
        className="
        p-4
      "
      >
        <button
          onClick={() => setVisibility(true)}
          className="border-2 border-red-950 "
        >
          <span>Nuevo Proyecto</span>
        </button>
      </div>
      <div
        className={`
      absolute
      top-0
      left-0
      w-full
      h-full
      ${visibility ? "flex" : "hidden"}
      justify-center
      items-center
    `}
      >
        <div
          className="
        w-full
        h-full
        md:w-1/3
        md:h-3/4
        bg-neutral-800
        rounded-xl
        p-6
        shadow-xl
        relative
      "
        >
          <button
            onClick={() => setVisibility(false)}
            className="absolute right-4 top-4"
          >
            <span>
              <CiCircleRemove size={40} color="white" />
            </span>
          </button>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                {...register("name", { required: true })}
              />
              {errors.name && <span>Este campo es requerido</span>}

              <label htmlFor="description">Descripción</label>
              <input
                type="text"
                id="description"
                {...register("description", { required: true })}
              />
              {errors.description && <span>Este campo es requerido</span>}
              <label htmlFor="deadline">Fecha de entrega</label>
              <input
                type="date"
                id="deadline"
                {...register("deadline", { required: true })}
              />
              {errors.deadline && <span>Este campo es requerido</span>}

              <button type="submit">Crear Proyecto</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewProjectForm;
