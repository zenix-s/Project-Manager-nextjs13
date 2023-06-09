"use client";
import ModalContainer from "./modalcontainer";
import useProjectsModal from "@/hooks/useProjectsModal";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../button";
import Input from "../inputs/input";
import { useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

const NewProjectForm = () => {
  const ProjectsModal = useProjectsModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    const res = await axios
      .post("/api/proyectos", data)
      .then((res) => {
        if (res.data.status === 200){
          router.refresh();
          toast.success(res.data.message);
        }

      })
      .catch((error) => {
      })
      .finally(() => {
        setLoading(false);
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
        required={false}
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
          theme="primary"
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
