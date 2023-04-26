"use client";
import ModalContainer from "./modalcontainer";
import useProjectsModal from "@/hooks/useProjectsModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const NewProjectForm = () => {
  const ProjectsModal = useProjectsModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("hola mundo data");
    console.log(data);
  };

  const body = (
    <>
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
    </>
  );
  return (
    <ModalContainer
      title="Nuevo Proyecto"
      body={body}
      actionlabel="Crear"
      onSubmit={() => {
        handleSubmit(onSubmit);
      }}
      visible={ProjectsModal.isOpen}
      onClose={ProjectsModal.onClose}
    />
  );
};

export default NewProjectForm;
