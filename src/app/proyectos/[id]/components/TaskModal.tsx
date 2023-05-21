"use client";
import React, { use, useEffect, useState } from "react";
import useTasksModal from "@/hooks/useTasksModal";
import { VscChromeClose, VscChevronDown } from "react-icons/vsc";
import { TaskProps, TeamMemberProps, StateProps } from "@/types";
import Button from "@/components/button";
import Input from "@/components/inputs/input";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";
import { getHexColor, getBgColor } from "@/actions/getColors";
import toast from "react-hot-toast";

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

const TaskModal: React.FC<TaskModalProps> = ({
  TeamMembers,
  States,
  idProject,
}) => {
  const TaskModal = useTasksModal();
  const Task = TaskModal.Task;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
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

  const emptyUser = {
    id: 0,
    projectId: 0,
    userId: 0,
    role: "viewer",
    users: {
      username: "Selecciona un usuario",
    },
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
  const [TaskUser, setTaskUser] = useState(emptyUser);

  const [show, setShow] = useState(TaskModal.isOpen);

  useEffect(() => {
    setShow(TaskModal.isOpen);
    setValue("name", Task ? Task.name : "");
    setValue("description", Task ? Task.description : "");
    setValue("endDate", Task ? Task.endDate?.toISOString().split('T')[0] : "");

    if (Task) {
      const CurrentState = States.find((state) => state.id === Task.stateId);
      if (CurrentState) setTaskState(CurrentState);
    }

    if (Task) {
      const CurrentUser = TeamMembers.find(
        (member) => member.userId === Task.userId
      );
      if (CurrentUser) setTaskUser(CurrentUser);
    }
  }, [TaskModal.isOpen, Task, setValue, States, TeamMembers, getValues]);

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

    if  (task.id === 0) {
    
      toast.success("Tarea creada correctamente");
    
    }

    if (task.id > 0) {
      
      toast.success("Tarea actualizada correctamente");
    }

    console.log(task);
  };

  const onClose = () => {
    setValue("name", "");
    setValue("description", "");
    setValue("endDate", "");
    setTaskState(emptyState);

    TaskModal.setTask(emptyTask);

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
                    className={`btn-ghost btn w-full justify-between border ${
                      TaskState.id === 0 && "!border-neutral-400/20"
                    }`}
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
                              setValue("stateId", state.id);
                              setTaskState(state);
                            }}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Usuario</span>
                  <span className="label-text-alt"></span>
                </label>
                <div className="dropdown-bottom dropdown">
                  <label
                    tabIndex={0}
                    className={`btn-ghost btn w-full justify-between border border-neutral-400/20`}
                  >
                    <span>{TaskUser.users.username}</span>
                    <VscChevronDown />
                  </label>

                  <ul
                    tabIndex={0}
                    className="dropdown-content menu rounded-box w-full bg-base-100 pt-2 shadow"
                  >
                    <li className="border border-white/30">
                      <Button
                        label="Ninguno"
                        theme="ghost"
                        center
                        fullWidth
                        onClick={() => {
                          setValue("userId", null);
                          setTaskUser(emptyUser);
                        }}
                      />
                    </li>

                    {TeamMembers.map((member, index) => {
                      return (
                        <li key={index} className="border border-white/30">
                          <Button
                            label={member.users.username}
                            theme="ghost"
                            center
                            fullWidth
                            onClick={() => {
                              setValue("userId", member.userId);
                              setTaskUser(member);
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
