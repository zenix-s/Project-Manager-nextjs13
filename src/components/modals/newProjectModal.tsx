"use client";
import ModalContainer from "./modalcontainer";
import useProjectsModal from "@/hooks/useProjectsModal";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../button";
import Input from "../inputs/input";

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
      <Input
        id="name"
        label="Nombre del proyecto"
        type="text"
        required
        register={register}
        errors={errors}
      />
      <Input
        id="description"
        label="Descripción"
        type="text"
        required
        register={register}
        errors={errors}
      />
      <div className="mt-4">
        <input
          type="date"
          id="deadlineFormNewProject"
          placeholder="Fecha de entrega"
          {...register("deadline")}
          className="input-bordered input w-full"
        />

        {errors.deadline && <span>Este campo es requerido</span>}
      </div>
      <div className="mt-8">
        <Button
          label={loading ? "Cargando..." : "Crear"}
          theme="light"
          textColor="black"
          hoverEffect="darker"
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
