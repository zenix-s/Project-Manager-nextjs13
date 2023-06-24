"use client";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { StateProps, TaskProps } from "@/types";

interface NewTaskFormProps {
  idProject: number;
  estados: StateProps[];
  onAddTask: ({ newTask }: { newTask: TaskProps }) => void;
}

const NewTaskModal = ({ idProject, estados, onAddTask }: NewTaskFormProps) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FieldValues>(
    {
      defaultValues: {
        TitleNewTaskInput: "",
      },
    }
  );

  const CleanInputs = () => {
    setValue("TitleNewTaskInput", "");
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {

    onAddTask({
      newTask: {
        id: 0,
        name: data.TitleNewTaskInput,
        description: null,
        endDate: null,
        completed: false,
        stateId: null,
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
    <div className="flex flex-row w-full items-end justify-start gap-4">
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
