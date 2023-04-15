"use client";
import { useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import Button from "../button";
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
        window.location.reload();
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
        <Button
          onClick={() => setVisibility(true)}
          theme="light"
          text="Nuevo Proyecto"
        />
      </div>
      <div
        className={`
      absolute
      left-0
      top-0
      h-full
      w-full
      ${visibility ? "flex" : "hidden"}
      general-form-container
      z-20
      items-center
      justify-center
    `}
        // onclick if if the user clicks outside the form, it closes
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setVisibility(false);
          }
        }}
      >
        <div
          className="
        relative
        h-full
        w-full
        rounded-xl
        bg-neutral-800
        p-6
        shadow-xl
        md:h-3/4
        md:w-1/3
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
