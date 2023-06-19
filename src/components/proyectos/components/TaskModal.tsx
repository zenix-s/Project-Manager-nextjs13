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
import axios from "axios";
import { useRouter } from "next/navigation";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import {
  MdOutlineSignalCellularAlt,
  MdOutlineSignalCellularAlt1Bar,
  MdOutlineSignalCellularAlt2Bar,
  MdPriorityHigh,
} from "react-icons/md";
import {
  BsArchive,
  BsCheckCircle,
  BsCircle,
  BsCircleFill,
} from "react-icons/bs";
import { BsCheck } from "react-icons/bs";
import { LuCalendarDays, LuCalendarX2 } from "react-icons/lu";

interface TaskModalProps {
  TeamMembers: TeamMemberProps[];
  States: StateProps[];
  idProject: number;
  onAddTask: ({ newTask }: { newTask: TaskProps }) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({
  TeamMembers,
  States,
  idProject,
  onAddTask,
}) => {
  const TaskModal = useTasksModal();
  const Task = TaskModal.Task;
  const router = useRouter();

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
      priority: Task ? Task.priority : 0,
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
    priority: 0,
    projectId: 0,
    userId: null,
    archived: true,
    createdDate: new Date(),
  };

  type EndDateType = Date | null;

  const [TaskState, setTaskState] = useState(emptyState);
  const [TaskUser, setTaskUser] = useState(emptyUser);
  const [TaskEndDate, setTaskEndDate] = useState<EndDateType>(null);

  const [show, setShow] = useState(TaskModal.isOpen);
  const [priority, setPriority] = useState(0);

  useEffect(() => {
    setShow(TaskModal.isOpen);
    setValue("name", Task ? Task.name : "");
    setValue("description", Task ? Task.description : "");

    try {
      setValue("endDate", "");
      if (Task.endDate !== null) {
        setValue("endDate", new Date(Task.endDate).toISOString().split("T")[0]);
        setTaskEndDate(new Date(Task.endDate || new Date()));
      } else {
        setValue("endDate", "");
        setTaskEndDate(null);
      }
    } catch (error) {
      setValue("endDate", "");
    }

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
      stateId: TaskState.id,
      priority: priority,
      projectId: idProject,
      userId: data.userId,
      completed: Task ? Task.completed : false,
      archived: Task ? Task.archived : false,
      createdDate: Task ? Task.createdDate : new Date(),
    };

    if (task.id === 0) {
      const newTask = {
        name: data.name,
        description: data.description,
        endDate: new Date(data.endDate),
        stateId: TaskState.id,
        projectId: idProject,
        priority: priority,
        userId: data.userId,
        completed: false,
        archived: false,
        createdDate: new Date(),
      };

      const stateId = () => {
        if (newTask.stateId === 0) return null;
        else return newTask.stateId;
      };

      onAddTask({
        newTask: {
          id: 0,
          name: data.name,
          description: data.description,
          endDate: new Date(data.endDate),
          stateId: stateId(),
          priority: priority,
          projectId: idProject,
          userId: data.userId,
          completed: false,
          archived: false,
          createdDate: new Date(),
        },
      });

      onClose();

    }

    if (task.id > 0) {
      toast.success("Tarea actualizada correctamente");

      axios
        .put("/api/proyectos/tasks", {
          id: Task.id,
          name: data.name,
          stateId: TaskState.id,
          priority: priority,
          projectId: idProject,
          description: data.description,
          endDate: new Date(data.endDate),
          userId: data.userId,
        })
        .then((res) => {})
        .finally(() => {
          onClose();
        });
    }
    router.refresh();
  };

  const onClose = () => {
    setValue("name", "");
    setValue("description", "");
    setValue("endDate", "");
    setTaskState(emptyState);
    setTaskUser(emptyUser);

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
        <div className="modal-box relative w-11/12 max-w-4xl overflow-visible border border-white/30 p-0 sm:w-10/12 lg:w-7/12 ">
          <div className="w-full flex justify-between px-2 sm:px-4 items-center border-b border-white/30">
            <div className="flex items-center gap-2">
              <span>
                {
                  idProject
                }
              </span>
              <span>
                {" / "}
              </span>
              <span>
                
                {
                  Task ? "Editar tarea" : "Nueva tarea"
                }
              </span>
            </div>
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

            <div className="flex flex-col gap-2 p-2 sm:p-4">
              <input
                type="text"
                className="w-full resize-none bg-transparent text-2xl outline-transparent focus:outline-none "
                placeholder="Nombre *"
                {...register("name", { required: true })}
                defaultValue={Task ? Task.name : ""}
              />

              <textarea
                className="h-28 w-full mt-2 bg-transparent outline-transparent focus:outline-none"
                placeholder="Descripción (opcional)"
                {...register("description", { required: false })}
              >
                {Task ? Task.description : ""}
              </textarea>

              <div className="mt-2 flex w-full gap-2">
                {/*  */}
                <div className="dropdown-bottom dropdown">
                  <label tabIndex={0} className="">
                    <div className="flex items-center justify-center gap-1 rounded-md border border-white/20 px-2 py-1">
                      <span>
                        {priority === 0 && <BiDotsHorizontalRounded />}
                        {priority === 1 && <MdOutlineSignalCellularAlt1Bar />}
                        {priority === 2 && <MdOutlineSignalCellularAlt2Bar />}
                        {priority === 3 && <MdOutlineSignalCellularAlt />}
                        {priority === 4 && <MdPriorityHigh />}
                      </span>
                      <span className="text-sm">Prioridad</span>
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu w-52 rounded-md border border-white/20 bg-base-100 shadow"
                  >
                    <li>
                      <button
                        onClick={() => {
                          setValue("priority", 0);
                          setPriority(0);
                        }}
                        type="button"
                      >
                        <span>
                          <BiDotsHorizontalRounded />
                        </span>
                        <span className="">Sin Prioridad</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setValue("priority", 1);
                          setPriority(1);
                        }}
                        type="button"
                      >
                        <span>
                          <MdOutlineSignalCellularAlt1Bar />
                        </span>
                        <span className="">Baja</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setValue("priority", 2);
                          setPriority(2);
                        }}
                        type="button"
                      >
                        <span>
                          <MdOutlineSignalCellularAlt2Bar />
                        </span>
                        <span className="">Media</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setValue("priority", 3);
                          setPriority(3);
                        }}
                        type="button"
                      >
                        <span>
                          <MdOutlineSignalCellularAlt />
                        </span>
                        <span className="">Alta</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setValue("priority", 4);
                          setPriority(4);
                        }}
                        type="button"
                      >
                        <span>
                          <MdPriorityHigh />
                        </span>
                        <span className="">Urgente</span>
                      </button>
                    </li>
                  </ul>
                </div>
                {/* estado */}
                <div className="dropdown-bottom dropdown">
                  <label tabIndex={0} className="">
                    <div className="flex items-center justify-center gap-1 rounded-md border border-white/20 px-2 py-1">
                      <span
                        style={{
                          color: getHexColor(TaskState.color),
                        }}
                      >
                        {TaskState.id === 0 ? <BsCircle /> : <BsCircleFill />}
                      </span>
                      <span className="text-sm">
                        {TaskState.id === 0 ? "Sin estado" : TaskState.name}
                      </span>
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu w-52 rounded-md border border-white/20 bg-base-100 shadow"
                  >
                    <li>
                      <button
                        onClick={() => {
                          setValue("stateId", 0);
                          setTaskState(emptyState);
                        }}
                        type="button"
                      >
                        <span
                          className={`color-neutral-500 h-3 w-3 rounded-full`}
                        >
                          <BsCircle />
                        </span>
                        <span className="text-sm">Sin estado</span>
                      </button>
                    </li>
                    {States.map((state, index) => {
                      return (
                        <li key={index}>
                          <button
                            onClick={() => {
                              setValue("stateId", state.id);
                              setTaskState(state);
                            }}
                            type="button"
                          >
                            <span
                              className={`h-3 w-3 rounded-full`}
                              style={{
                                color: getHexColor(state.color),
                              }}
                            >
                              <BsCircleFill />
                            </span>
                            <span className="text-sm">{state.name}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                {/* usuario asignado */}
                <div className="dropdown-bottom dropdown">
                  <label tabIndex={0} className="">
                    <div className="flex items-center justify-center gap-1 rounded-md border border-white/20 px-2 py-1">
                      <span>
                        {TaskUser.userId === 0 ? (
                          <BsCircle />
                        ) : (
                          <BsCircleFill />
                        )}
                      </span>
                      <span className="text-sm">
                        {TaskUser.userId === 0
                          ? "Sin usuario"
                          : TaskUser.users.username}
                      </span>
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu w-52 rounded-md border border-white/20 bg-base-100 shadow"
                  >
                    <li>
                      <button
                        onClick={() => {
                          setValue("userId", null);
                          setTaskUser(emptyUser);
                        }}
                        type="button"
                      >
                        <span>
                          <BsCircle />
                        </span>
                        <span className="text-sm">Sin usuario</span>
                      </button>
                    </li>
                    {TeamMembers.map((member, index) => {
                      return (
                        <li key={index}>
                          <button
                            onClick={() => {
                              setValue("userId", member.userId);
                              setTaskUser(member);
                            }}
                            type="button"
                          >
                            <span className="bg-primary-500 h-3 w-3 rounded-full"></span>
                            <span className="text-sm">
                              {member.users.username}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                {/* Fecha de finalización */}
                <div className="dropdown-bottom dropdown">
                  <label tabIndex={0} className="">
                    <div className="flex items-center justify-center gap-1 rounded-md border border-white/20 px-2 py-1">
                      <span className="">
                        <LuCalendarDays />
                      </span>

                      <span className="text-sm">

                        {TaskEndDate !== null
                          ? TaskEndDate.toLocaleDateString("es-ES", {
                              month: "long",
                              day: "numeric",
                            })
                          : "Fecha límite"}
                      </span>
                    </div>
                  </label>
                  <ul className="dropdown-content menu w-52 rounded-md border border-white/20 bg-base-100 shadow">
                    <li>
                      <button
                        onClick={() => {
                          setValue("endDate", "");
                          setTaskEndDate(null);
                        }}
                        type="button"
                      >
                        <span>
                          <LuCalendarX2 />
                        </span>
                        <span>Eliminar fecha</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setValue(
                            "endDate",
                            new Date(
                              new Date(TaskEndDate || new Date()).getTime() +
                                86400000
                            )
                              .toISOString()
                              .split("T")[0]
                          );
                          setTaskEndDate(
                            new Date(
                              new Date(TaskEndDate || new Date()).getTime() +
                                86400000
                            )
                          );
                        }}
                        type="button"
                      >
                        <span>
                          <LuCalendarDays />
                        </span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setValue(
                            "endDate",
                            new Date(
                              new Date(TaskEndDate || new Date()).getTime() +
                                604800000
                            )
                              .toISOString()
                              .split("T")[0]
                          );
                          setTaskEndDate(
                            new Date(
                              new Date(TaskEndDate || new Date()).getTime() +
                                604800000
                            )
                          );
                        }}
                        type="button"
                      >
                        <span>
                          <LuCalendarDays />
                        </span>
                        <span>
                          {TaskEndDate !== null
                            ? "Sumar una semana"
                            : "Una semana"}
                        </span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setValue(
                            "endDate",
                            new Date(
                              new Date(TaskEndDate || new Date()).getTime() +
                                2592000000
                            )
                              .toISOString()
                              .split("T")[0]
                          );
                          setTaskEndDate(
                            new Date(
                              new Date(TaskEndDate || new Date()).getTime() +
                                2592000000
                            )
                          );
                        }}
                        type="button"
                      >
                        <span>
                          <LuCalendarDays />
                        </span>
                        <span>
                          {/* {tarea.endDate !== null ? "Sumar un mes" : "Un mes"} */}
                          {TaskEndDate !== null ? "Sumar un mes" : "Un mes"}
                        </span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="w-full border-t border-white/30 p-4 flex justify-center sm:justify-end">
              {/* <Button
                theme="primary"
                type="submit"
                label={Task ? "Guardar" : "Crear"}
                fullWidth
                center
                fontSize="lg"
              /> */}
              <button className="rounded-lg border border-white/30 bg-primary w-full sm:w-max px-4 py-2 sm:px-2 sm:py-1">
                <span className="text-md">{Task ? "Guardar" : "Crear"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TaskModal;
