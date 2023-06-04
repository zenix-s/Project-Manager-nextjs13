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
      },
    });

    CleanInputs();
  };
  return (
    <div className="flex flex-col lg:flex-row w-full items-end justify-start gap-4">
      <Input
        id="TitleNewTaskInput"
        label="Nombre de la tarea"
        type="text"
        required
        register={register}
        errors={errors}
      />

      <div className="form-control">
        <label className="label">
          <label className="label-text">
            Estado
          </label>
        </label>
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
              {estado.name}
            </option>
          ))}
        </select>
      </div>

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
