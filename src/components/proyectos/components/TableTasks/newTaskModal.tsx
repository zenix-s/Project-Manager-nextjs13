"use client";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { StateProps, TaskProps } from "@/types";
import { useRouter } from "next/navigation";
import Input from "@/components/inputs/input";
import Button from "@/components/button";
import { getHexColor } from "@/actions/getColors";

interface NewTaskFormProps {
  idProject: number;
  estados: StateProps[];
  onAddTask: ({ newTask }: { newTask: TaskProps }) => void;
}

const NewTaskModal = ({ idProject, estados, onAddTask }: NewTaskFormProps) => {
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

    onAddTask({
      newTask: {
        id: 0,
        name: data.TitleNewTaskInput,
        description: null,
        endDate: null,
        completed: false,
        stateId: parseInt(data.stateFormNewTask),
        projectId: idProject,
        userId: null,
        archived: false,
        createdDate: new Date(),
        priority: 0,
      },
    });

    CleanInputs();
  };
  return (
    <div className="flex flex-col lg:flex-row w-full items-end justify-start gap-4">
      <input 
        type="text"
        id="TitleNewTaskInput"
        className="input input-bordered px-2 py-2 h-min"
        placeholder="Nombre de la tarea"
        {...register("TitleNewTaskInput", { required: true })}
      />

      <button 
        onClick={handleSubmit(onSubmit)}
        className="bg-primary rounded-md p-2"
        disabled={loading}
      >
        {loading ? "Cargando..." : "Crear tarea"}
      </button>
    </div>
  );
};

export default NewTaskModal;
