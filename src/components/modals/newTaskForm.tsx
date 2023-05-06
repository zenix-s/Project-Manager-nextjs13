"use client";
import { useState } from "react";
import Button from "../button";
import useTasksModal from "@/hooks/useTasksModal";
import ModalContainer from "./modalcontainer";
import Input from "../inputs/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { EstadoProps } from "@/types";
import Select from "../inputs/selector";
interface NewTaskFormProps {
  idProject: string;
  estados: EstadoProps[];
}

const NewTaskModal = ({ idProject, estados }: NewTaskFormProps) => {
  const [loading, setLoading] = useState(false);
  const TasksModal = useTasksModal();
  const [idEstado, setIdEstado] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const estadosOptions = estados.map((estado) => ({
    id: estado.id,
    value: estado.id,
    label: estado.nombre,
    selected: false,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3000/api/proyectos/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: data.name,
            id_estado: parseInt(data.id_estado),
            id_proyecto: parseInt(idProject),
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", data);
        console.log(result);
        setLoading(false);
        TasksModal.onClose();
      }
    } catch (err) {
      console.error(err);
    }
  };

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

        <select {...register("id_estado")} className="w-full rounded p-4">
          {estados.map((estado) => (
            <option key={estado.id} value={estado.id}>
              {estado.nombre}
            </option>
          ))}
        </select>

        <Button
          label={loading ? "Cargando..." : "Crear tarea"}
          onClick={handleSubmit(onSubmit)}
          theme="light"
          textColor="black"
          fullWidth
          center
          uppercase
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
