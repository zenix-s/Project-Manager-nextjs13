"use client";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { Toast, toast } from "react-hot-toast";
import { EstadoProps } from "@/types";
import { useRouter } from "next/navigation";
import Input from "@/components/inputs/input";
import Button from "@/components/button";
import { getHexColor } from "@/actions/getColors";

interface NewTaskFormProps {
  idProject: number;
  estados: EstadoProps[];
}

const NewTaskModal = ({ idProject, estados }: NewTaskFormProps) => {
  const [loading, setLoading] = useState(false);
  const [TitleError, setTitleError] = useState(false);
  const [StateError, setStateError] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FieldValues>();

  const CleanInputs = () => {
    setValue("TitleNewTaskInput", "");
    setValue("stateFormNewTask", "Selecciona un estado");
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    if (data.stateFormNewTask === "Selecciona un estado") {
      setStateError(true);
    }

    if (data.TitleNewTaskInput === "") {
      setTitleError(true);
    }

    if (
      data.TitleNewTaskInput === "" ||
      data.stateFormNewTask === "Selecciona un estado"
    ) {
      setLoading(false);
      return;
    }

    axios
      .post("/api/proyectos/tasks", {
        nombre: data.TitleNewTaskInput,
        id_estado: parseInt(data.stateFormNewTask),
        id_proyecto: idProject,
      })
      .then((res) => {
        CleanInputs();
        setTitleError(false);
        setStateError(false);
        toast.success("Tarea creada correctamente");
        router.refresh();
      })
      .catch((err) => toast.error(err.response.data.message))
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="flex w-full items-end justify-start gap-4">
      <Input
        id="TitleNewTaskInput"
        label="Nombre de la tarea"
        type="text"
        required
        register={register}
        errors={errors}
      />

      <select
        {...register("stateFormNewTask")}
        className={`select-bordered select ${StateError ? "select-error" : ""}`}
        defaultValue="Selecciona un estado"
      >
        <option disabled>Selecciona un estado</option>
        {estados.map((estado) => (
          <option
            key={estado.id}
            value={estado.id}
            style={{
              backgroundColor: getHexColor(estado.color),
            }}
          >
            {estado.nombre}
          </option>
        ))}
      </select>

      <Button
        onClick={handleSubmit(onSubmit)}
        loading={loading}
        disabled={loading}
        label={loading ? "Cargando..." : "Crear tarea"}
        theme="primary"
      />
    </div>
  );
};

export default NewTaskModal;
