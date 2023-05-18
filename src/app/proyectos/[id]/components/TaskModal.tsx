"use client";
import React, { use, useEffect, useState } from "react";
import useTasksModal from "@/hooks/useTasksModal";
import { VscChromeClose, VscChevronDown } from "react-icons/vsc";
import { TaskProps, TeamMemberProps, StateProps } from "@/types";
import Button from "@/components/button";
import Input from "@/components/inputs/input";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";
import { getHexColor, getBgColor } from "@/actions/getColors";

// export interface TaskProps {
//   id: number;
//   name: string;
//   description: string | null;
//   endDate: Date | null;
//   completed: boolean;
//   stateId: number;
//   projectId: number;
//   userId: number | null;
//   archived: boolean;
//   createdDate: Date;
// }

interface TaskModalProps {
  TeamMembers: TeamMemberProps[];
  States: StateProps[];
  idProject: number;
}

// const TaskModal FC<TaskModalProps> = ({ TeamMember, States }) => {

const TaskModal: React.FC<TaskModalProps> = ({ TeamMembers, States, idProject }) => {
  const TaskModal = useTasksModal();
  const Task = TaskModal.Task;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      name: Task ? Task.name : "",
      description: Task ? Task.description : "",
      endDate: Task ? Task.endDate : "",
      completed: Task ? Task.completed : false,
      stateId: Task ? Task.stateId : 0,
      projectId: Task ? Task.projectId : 0,
      userId: Task ? Task.userId : 0,
      archived: Task ? Task.archived : false,
      createdDate: Task ? Task.createdDate : new Date(),
    },
  });

  const emptyState = {
    id: 0,
    name: "Selecciona un estado",
    color: "grey",
  };

  const emptyTask = {
    id: 0,
    name: "",
    description: "",
    endDate: null,
    completed: false,
    stateId: 0,
    projectId: 0,
    userId: null,
    archived: true,
    createdDate: new Date(),
  };

  const [TaskState, setTaskState] = useState(emptyState);

  const [show, setShow] = useState(TaskModal.isOpen);

  useEffect(() => {
    setShow(TaskModal.isOpen);
    setValue("name", Task ? Task.name : "");
    setValue("description", Task ? Task.description : "");

  }, [TaskModal.isOpen, Task, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    

    const task: TaskProps = {
      id: Task ? Task.id : 0,
      name: data.name,
      description: data.description,
      endDate: new Date(data.endDate),
      completed: false,
      stateId: TaskState.id,
      projectId: idProject,
      userId: data.userId,
      archived: false,
      createdDate: new Date(),
    };

    console.log(task);

  };

  const onClose = () => {
    setValue("name", "");
    setValue("description", "");
    setValue("endDate", "");
    setTaskState(emptyState);

    TaskModal.setTask(
      emptyTask
    );

    TaskModal.onClose();
  };

  return (
    <>
      <div
        className={`
        modal
        ${show ? "modal-open" : ""}
      `}
      >
        <div className="modal-box relative">
          <div className="absolute right-2 top-2">
            <Button
              theme="ghost"
              icon={VscChromeClose}
              circle
              center
              fontSize="lg"
              onClick={() => {
                onClose();
              }}
            />
          </div>
          <form
            className="flex flex-col gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="text-lg font-bold">
              {Task ? Task.name : "Nueva tarea"}
            </h3>

            <div>
              <Input
                label="Nombre *"
                id="name"
                type="text"
                register={register}
                errors={errors}
                required
              />

              <Input
                label="Descripción"
                id="description"
                type="text"
                register={register}
                errors={errors}
                required={false}
              />

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Estado *</span>
                  <span className="label-text-alt"></span>
                </label>
                <div className="dropdown-bottom dropdown">
                  <label
                    tabIndex={0}
                    className="btn-ghost btn w-full justify-between border border-neutral-300/30"
                    style={{
                      borderColor: getHexColor(TaskState.color),
                    }}
                  >
                    <span>{TaskState.name}</span>
                    <VscChevronDown />
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu rounded-box w-full bg-base-100 pt-2 shadow"
                  >
                    {States.map((state, index) => {
                      return (
                        <li
                          key={index}
                          style={{
                            backgroundColor: getHexColor(state.color),
                          }}
                        >
                          <Button
                            label={state.name}
                            theme="ghost"
                            center
                            fullWidth
                            onClick={() => {
                              setTaskState(state);
                            }}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <Input
                label="Fecha de finalización"
                id="endDate"
                type="date"
                register={register}
                errors={errors}
                required={false}
              />

              <Input
                label="Usuario"
                id="userId"
                type="number"
                register={register}
                errors={errors}
                required={false}
              />
            </div>

            <div>
              <Button
                theme="primary"
                type="submit"
                label={Task ? "Guardar" : "Crear"}
                fullWidth
                center
                fontSize="lg"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TaskModal;
