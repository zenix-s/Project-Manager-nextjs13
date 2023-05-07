"use client";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { EstadoProps } from "@/types";
import { useRouter } from "next/navigation";

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

    fetch("http://localhost:3000/api/proyectos/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: data.TitleNewTaskInput,
        id_estado: parseInt(data.stateFormNewTask),
        id_proyecto: idProject,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        CleanInputs();
        setTitleError(false);
        setStateError(false);
        router.refresh();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        console.log("Finalizado");
        console.log(data);
      });
  };
  return (
    <div className="flex w-full items-center justify-start gap-4">
      <div className="flex h-full items-center justify-center">
        <input
          type="text"
          placeholder="Nombre de la tarea"
          className={`input-bordered input w-full
          max-w-xs
          ${ TitleError ? "input-error" : ""}
          `}
          {...register("TitleNewTaskInput")}
        />
      </div>

      <div className="h-full">
        <select
          {...register("stateFormNewTask")}
          className={`select ${StateError ? "select-error" : ""}`}
          defaultValue="Selecciona un estado"
        >
          <option disabled>Selecciona un estado</option>
          {estados.map((estado) => (
            <option key={estado.id} value={estado.id}>
              {estado.nombre}
            </option>
          ))}
        </select>
      </div>

      <button
        className="btn-primary btn-active btn"
        onClick={handleSubmit(onSubmit)}
        disabled={loading}
      >
        {loading ? "Cargando..." : "Crear tarea"}
      </button>
    </div>
  );
};

export default NewTaskModal;
