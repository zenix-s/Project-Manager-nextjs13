"use client";
import { useState } from "react";
import Button from "../button";
import useTasksModal from "@/hooks/useTasksModal";
import ModalContainer from "./modalcontainer";
import Input from "../inputs/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
const NewTaskModal = () => {
  const [loading, setLoading] = useState(false);
  const TasksModal = useTasksModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const BodyModal = () => {
    return (
      <div className="flex flex-col gap-4">
        <Input
          id="name"
          label="Nombre de la tarea"
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
      </div>
    );
  };
  return (
    <ModalContainer
      actionlabel="Crear tarea"
      title="Nueva tarea"
      body={<BodyModal />}
      onClose={TasksModal.onClose}
      visible={TasksModal.isOpen}
    />
  );
};

export default NewTaskModal;
