"use client";
import { TaskProps, StateProps, TeamMemberProps } from "@/types";
import { use, useState } from "react";
import {
  VscKebabVertical,
  VscAccount,
  VscEdit,
  VscTrash,
  VscInbox,
} from "react-icons/vsc";
import { getBgColor, getHexColor } from "@/actions/getColors";
import Button from "@/components/button";
import useTasksModal from "@/hooks/useTasksModal";
const IndividualTask = ({
  tarea,
  estados,
  teamMembers,
  onChangeTask,
  onDeleteTask,
}: {
  tarea: TaskProps;
  estados: StateProps[];
  teamMembers: TeamMemberProps[];
  onChangeTask: ({ updatedTask }: { updatedTask: TaskProps }) => void;
  onDeleteTask: ({ taskId }: { taskId: number }) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const TaskModal = useTasksModal();


  const defaultDate = () => {
    try {
      if (tarea.endDate !== null) {
        return new Date(tarea.endDate).toISOString().split("T")[0];
      }
    } catch (error) {
      return "";
    }
  }

  return (
    <tr>
      <th>
        <input
          type="checkbox"
          defaultChecked={tarea.completed}
          className="checkbox tooltip tooltip-right"
          data-tip={tarea.completed ? "Marcar como incompleta" : "Marcar como completa"}
          onChange={(e) => {
            onChangeTask({
              updatedTask: {
                ...tarea,
                completed: e.target.checked,
              },
            });
          }}
        />
      </th>

      <td className="w-56">
        <h3>{tarea.name}</h3>
      </td>

      <td>
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn w-48 justify-start"
            style={{
              backgroundColor: getHexColor(
                estados.find((estado) => estado.id === tarea.stateId)?.color ||
                  "gray"
              ),
            }}
          >
            <span
              className="text-lg text-white"
              style={{
                textShadow: "0px 0px 2px #000000",
              }}
            >
              {estados.find((estado) => estado.id === tarea.stateId)?.name ||
                "Cargando"}
            </span>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box mt-2 w-full bg-base-100 shadow outline outline-2 outline-slate-200"
          >
            {estados.map((estado) => (
              <li key={estado.id}>
                <button
                  className="uppercase"
                  style={{
                    backgroundColor: getHexColor(estado.color),
                  }}
                  onClick={() => {
                    onChangeTask({
                      updatedTask: {
                        ...tarea,
                        stateId: estado.id,
                      },
                    });
                  }}
                >
                  {estado.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </td>

      <td>
        <input
          type="date"
          className="input-bordered input w-56"
          defaultValue={
            defaultDate()
          }
          disabled={tarea.completed}
          onChange={(e) => {
            onChangeTask({
              updatedTask: {
                ...tarea,
                endDate: new Date(e.target.value),
              },
            });
          }}
        />
      </td>

      <td>
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn-ghost btn m-1 w-56 justify-start gap-2"
          >
            <VscAccount />{" "}
            {tarea.userId
              ? teamMembers.find((member) => member.userId === tarea.userId)
                  ?.users.username
              : "Sin asignar"}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box w-full bg-base-100 pt-2 shadow"
          >
            <li>
              <button
                onClick={() => {
                  onChangeTask({
                    updatedTask: {
                      ...tarea,
                      userId: null,
                    },
                  });
                }}
              >
                Sin asignar
              </button>
            </li>
            {teamMembers.map((member: TeamMemberProps) => (
              <li key={member.id}>
                <button
                  onClick={() => {
                    onChangeTask({
                      updatedTask: {
                        ...tarea,
                        userId: member.userId,
                      },
                    });
                  }}
                >
                  {member.users.username}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </td>
      <th>
        <div className="dropdown dropdown-bottom dropdown-end">
          <label tabIndex={0} className="btn m-1 border-none bg-transparent">
            <VscKebabVertical />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box mt-2 w-52 bg-base-100 shadow"
          >
            <li>
              <Button
                label="Editar"
                theme="ghost"
                fullWidth
                onClick={() => {
                  TaskModal.onOpen(tarea);
                }}
                icon={VscEdit}
              />
            </li>
            <li>
              <Button
                label={tarea.archived ? "Desarchivar" : "Archivar"}
                theme="ghost"
                fullWidth
                onClick={() => {
                  onChangeTask({
                    updatedTask: {
                      ...tarea,
                      archived: !tarea.archived,
                    },
                  });
                }}
                icon={VscInbox}
              />
            </li>
            <li>
              <Button
                label="Eliminar"
                theme="error"
                fullWidth
                onClick={() => {
                  onDeleteTask({
                    taskId: tarea.id,
                  });
                }}
                icon={VscTrash}
              />
            </li>
          </ul>
        </div>
      </th>
    </tr>
  );
};

export default IndividualTask;
