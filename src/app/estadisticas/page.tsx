"use client";

import { useEffect, useState } from "react";
import { TaskProps } from "@/types";
import { AiOutlineClockCircle } from "react-icons/ai";

interface StatsProps {
  username: string;
  amountOfAsignedTasks: number;
  amountOfCompletedTasks: number;
  archivedTasks: number;
  averageTime: number;
  noPriority: number;
  lowPriority: number;
  mediumPriority: number;
  highPriority: number;
  urgentPriority: number;
}
import {
  MdOutlineSignalCellularAlt1Bar,
  MdOutlineSignalCellularAlt2Bar,
  MdOutlineSignalCellularAlt,
  MdPriorityHigh,
  MdOutlineEditCalendar,
  MdOutlineCalendarMonth,
} from "react-icons/md";
import { BiDotsHorizontalRounded } from "react-icons/bi";

const Page = () => {
  const [stats, setStats] = useState<StatsProps>();

  useEffect(() => {
    fetch("api/userStats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        console.log(data);
      });
  }, []);

  if (!stats) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="">loading...</div>
      </div>
    );
  }

  const averageTimeToString = (averageTime: number) => {
    const days = averageTime / 1000 / 60 / 60 / 24;
    if (days > 1) {
      return `${Math.round(days)} dias`;
    }
    const hours = averageTime / 1000 / 60 / 60;
    if (hours > 1) {
      return `${Math.round(hours)} horas`;
    }
    const minutes = averageTime / 1000 / 60;
    if (minutes > 1) {
      return `${Math.round(minutes)} minutos`;
    }
    const seconds = averageTime / 1000;
    if (seconds > 1) {
      return `${Math.round(seconds)} segundos`;
    }
    return "0 segundos";
  };
  const totalTasks =
    stats?.amountOfAsignedTasks +
    stats?.archivedTasks +
    stats?.amountOfCompletedTasks;
  const pendingPercentage = (stats?.amountOfAsignedTasks / totalTasks) * 100;
  const completedPercentage =
    (stats?.amountOfCompletedTasks / totalTasks) * 100;
  const archivedPercentage = (stats?.archivedTasks / totalTasks) * 100;

  const totalTasks2 =
    stats?.noPriority +
    stats?.lowPriority +
    stats?.mediumPriority +
    stats?.highPriority +
    stats?.urgentPriority;
  const nowPriorityPercentage = (stats?.noPriority / totalTasks2) * 100;
  const lowPriorityPercentage = (stats?.lowPriority / totalTasks2) * 100;
  const mediumPriorityPercentage = (stats?.mediumPriority / totalTasks2) * 100;
  const highPriorityPercentage = (stats?.highPriority / totalTasks2) * 100;
  const urgentPriorityPercentage = (stats?.urgentPriority / totalTasks2) * 100;

  return (
    <>
      <section className="flex h-full w-full flex-col overflow-y-auto">
        <div className="relative h-full w-full">
          <div className="absolute inset-0 md:pb-2 md:pr-2 ">
            <div className="flex h-full w-full flex-col rounded-lg p-2">
              <div className="flex h-min w-full justify-start p-2">
                <div className="flex items-end gap-4 uppercase">
                  <span className="text-5xl">
                    <strong>Estadisticas</strong>
                  </span>
                  <span className="text-5xl">{stats?.username}</span>
                </div>
              </div>
              <div className="divider" />
              {/* Seccion estadisticas */}
              <div className="flex h-min flex-col items-start gap-4 rounded-md  p-4 ">
                <div className="w-full">
                  <span className="text-3xl">Tareas</span>
                </div>

                <div className="w-full">
                  <div className="flex w-full items-center justify-center">
                    <div className="w-full">
                      <div className="flex h-4 overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-4 bg-blue-500"
                          style={{
                            flexGrow: `${stats?.amountOfAsignedTasks}`,
                          }}
                        ></div>
                        <div
                          className="h-4 bg-yellow-500"
                          style={{
                            flexGrow: `${stats?.amountOfCompletedTasks}`,
                          }}
                        ></div>
                        <div
                          className="h-4 bg-green-500"
                          style={{
                            flexGrow: `${stats?.archivedTasks}`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-2xl ">
                    <span className="h-9 w-9 rounded-full bg-blue-500" />
                    <span className="">Pendientes</span>
                    <span>{stats?.amountOfAsignedTasks}</span>
                  </div>
                  <div className="flex items-center gap-2 text-2xl">
                    <span className="h-9 w-9 rounded-full bg-yellow-500" />
                    <span className="">Completadas</span>
                    <span>{stats?.amountOfCompletedTasks}</span>
                  </div>
                  <div className="flex items-center gap-2 text-2xl">
                    <span className="h-9 w-9 rounded-full bg-green-500" />
                    <span className="">Archivadas</span>
                    <span>{stats?.archivedTasks}</span>
                  </div>
                </div>
              </div>
              <div className="divider" />
              {/* Seccion promedio */}
              <div className="flex h-min flex-col items-start gap-4 rounded-md  p-4 ">
                <div className="flex gap-4">
                  <div className="flex flex-col ">
                    <div className="text-2xl">
                      Tiempo medio para completar una tarea
                    </div>
                    <div className="flex items-center gap-2 text-2xl">
                      <div>
                        <AiOutlineClockCircle />
                      </div>
                      <div>{averageTimeToString(stats?.averageTime)}</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Seccion prioridades */}
              <div className="divider" />
              <div className="flex h-min flex-col items-start gap-4 rounded-md  p-4 ">
                <div className="w-full">
                  <span className="text-3xl">Prioridades</span>
                </div>
                <div className="flex w-full items-center justify-center">
                  <div className="w-full flex flex-col gap-4">
                    <div>
                      <div className="flex flex-row-reverse items-center justify-between">
                        <div className="h-6 w-6 rounded-full bg-blue-500"></div>
                        <div className="text-xl flex gap-2">
                          <span>
                            <BiDotsHorizontalRounded />
                          </span>
                          <span>Sin Prioridad</span>
                        </div>
                      </div>
                      <div className="mt-1 h-2 w-full bg-gray-200">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${nowPriorityPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="mt-2 flex flex-row-reverse items-center justify-between">
                        <div className="h-6 w-6 rounded-full bg-yellow-500"></div>
                        <div className="text-xl flex gap-2">
                          <span>
                            <MdOutlineSignalCellularAlt1Bar />
                          </span>
                          <span>Baja</span>
                        </div>
                      </div>
                      <div className="mt-1 h-2 w-full bg-gray-200">
                        <div
                          className="h-full bg-yellow-500"
                          style={{ width: `${lowPriorityPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="mt-2 flex flex-row-reverse items-center justify-between">
                        <div className="h-6 w-6 rounded-full bg-green-500"></div>
                        <div className="text-xl flex gap-2">
                          <span>
                            <MdOutlineSignalCellularAlt2Bar />
                          </span>
                          <span>Media</span>
                        </div>
                      </div>
                      <div className="mt-1 h-2 w-full bg-gray-200">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: `${mediumPriorityPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="mt-2 flex flex-row-reverse items-center justify-between">
                        <div className="h-6 w-6 rounded-full bg-purple-500"></div>
                        <div className="text-xl flex gap-2">
                          <span>
                            <MdOutlineSignalCellularAlt />
                          </span>
                          <span>Alta</span>
                        </div>
                      </div>
                      <div className="mt-1 h-2 w-full bg-gray-200">
                        <div
                          className="h-full bg-purple-500"
                          style={{ width: `${highPriorityPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="mt-2 flex flex-row-reverse items-center justify-between">
                        <div className="h-6 w-6 rounded-full bg-red-500"></div>
                        <div className="text-xl flex gap-2">
                          <span>
                            <MdPriorityHigh />
                          </span>
                          <span>Urgente</span>
                        </div>
                      </div>
                      <div className="mt-1 h-2 w-full bg-gray-200">
                        <div
                          className="h-full bg-red-500"
                          style={{ width: `${urgentPriorityPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="divider" />
              {/* Seccion calendario */}
              
              <div className="divider" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
