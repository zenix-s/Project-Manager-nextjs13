"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TaskProps, TeamMemberProps } from "@/types";
import { useRouter } from "next/navigation";
import { VscAccount } from "react-icons/vsc";

interface paramsProps {
  taskid: number;
  id: number;
}

const Page = async ({ params }: { params: paramsProps }) => {
  const [Task, setTask] = useState({
    id: 0,
  } as TaskProps);
  const [Estados, setEstados] = useState([]);
  const [TeamMembers, setTeamMembers] = useState([] as TeamMemberProps[]);
  const [Loading, setLoading] = useState(true);
  const router = useRouter();

  const projectId = params.id;

  useEffect(() => {
    axios
      .get(`/api/proyectos/tasks/task`, {
        headers: {
          taskId: params.taskid,
          projectId: projectId,
        },
      })
      .then((res) => {
        res.data;
        if (res.data.status === 200) {
          setTask(res.data.task);
          setEstados(res.data.estados);
          setTeamMembers(res.data.teamMembers);
          toast.success(res.data.message);
          setLoading(false);
          console.log(res.data);
        }
        if (res.data.status !== 200) {
          router.push(`/proyectos/`);
        }
      })
      .catch((err) => {
        toast.error("Error durante la ejecución");
      })
      .finally(() => {
        console.log("done");
      });
  }, [params.taskid, projectId, router]);

  /**
   * @param updatedTask
   * El parametro updatedTask es un objeto que contiene la tarea actualizada.
   * Actualiza una tarea en la base de datos y en el estado local.
   */
  const onChangeTask = async ({ updatedTask }: { updatedTask: TaskProps }) => {
    axios
      .put("/api/proyectos/tasks", updatedTask)
      .then((res) => {
        if (res.data.status === 200) {
          toast.success(res.data.message);
        }
        if (res.data.status !== 200) {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al actualizar la tarea");
      });
  };

  if (Loading)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  if (Task.id === 0)
    return (
      <div>
        <h1>Not found</h1>
      </div>
    );

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 overflow-y-auto">
        <div>
          <input type="text" defaultValue={Task.name} />
        </div>
        <div>
          <textarea defaultValue={Task.description || ""} />
        </div>
        <div>
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn-ghost btn m-1 w-56 justify-start gap-2"
            >
              <VscAccount />
              <span>
                {Task.userId
                  ? TeamMembers.find((member) => member.userId === Task.userId)
                      ?.users.username
                  : "Sin asignar"}
              </span>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box w-full bg-base-100 pt-2 shadow"
            >
              <li>
                <button onClick={() => {}}>Sin asignar</button>
              </li>
              {TeamMembers.map((member: TeamMemberProps) => (
                <li key={member.id}>
                  <button onClick={() => {}}>{member.users.username}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
