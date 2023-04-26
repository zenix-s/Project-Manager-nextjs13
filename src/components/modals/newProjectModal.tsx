"use client";
import ModalContainer from "./modalcontainer";
import useProjectsModal from "@/hooks/useProjectsModal";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../button";

import { useState } from "react";

const NewProjectForm = () => {
  const ProjectsModal = useProjectsModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    const res = await axios
      .post("/api/proyectos", data)
      .then(() => {
        console.log("Proyecto creado");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
        console.log("Finalizado");
        ProjectsModal.onClose();
      });

  };

  const body = (
    <div className="flex flex-col gap-4">
      <div>
        <input
          type="text"
          placeholder="Nombre del proyecto"
          {...register("name", { required: true })}
        />
        {errors.name && <span>Este campo es requerido</span>}
      </div>
      <div>
        <input
          type="text"
          placeholder="Descripción"
          {...register("description", { required: true })}
        />
        {errors.description && <span>Este campo es requerido</span>}
      </div>
      <div>
        <input
          type="date"
          placeholder="Fecha de entrega"
          {...register("deadline", { required: true })}
        />
        {errors.deadline && <span>Este campo es requerido</span>}
      </div>
      <div >
        <Button
          label={loading ? "Cargando..." : "Crear"}
          theme="light"
          onClick={handleSubmit(onSubmit)}
          fullWidth
          center
        />
      </div>
    </div>
  );
  return (
    <ModalContainer
      title="Nuevo Proyecto"
      body={body}
      actionlabel="Crear"
      visible={ProjectsModal.isOpen}
      onClose={ProjectsModal.onClose}
    />
  );
};

export default NewProjectForm;
