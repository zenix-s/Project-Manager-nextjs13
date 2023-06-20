"use client";
import { useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import Button from "../button";
import axios from "axios";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await axios
      .post("/api/proyectos", data)
      .then(() => {
        setVisibility(false);
        router.refresh();
      })
      .catch((error) => {})
      .finally(() => {});
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
          theme="primary"
          label="Nuevo Proyecto"
        />
      </div>
      <div className={`modal ${visibility && "modal-open"}`}>
        <div className="modal-box">
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
                {...register("description", { required: false })}
              />
              {errors.description && <span>Este campo es requerido</span>}
              <label htmlFor="deadline">Fecha de entrega</label>
              <input
                type="date"
                id="deadline"
                {...register("deadline", { required: false })}
              />
              {errors.deadline && <span>Este campo es requerido</span>}

              <Button type="submit" theme="primary" label="Crear Proyecto" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewProjectForm;
