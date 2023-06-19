"use client";

import { useEffect, useState } from "react";
import { TaskProps } from "@/types";

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
    return '0 segundos';
  }

  return (
    <>
      <section className="flex h-full w-full flex-col">
        <div className="relative h-full w-full">
          <div className="absolute inset-0 md:pb-2 md:pr-2 ">
            <div className="flex h-full w-full flex-col rounded-lg border border-white/20 p-2">
              <div className="flex h-min w-full justify-start p-2">
                <div className="flex items-end gap-4 uppercase">
                  <span className="text-5xl">
                    <strong>Estadisticas</strong>
                  </span>
                  <span className="text-5xl">{stats?.username}</span>
                </div>
              </div>
              {/* Seccion estadisticas */}
              <div className="flex h-min flex-col items-start gap-4 rounded-md  p-4 ">
                <div className="w-full">
                  <span className="text-3xl">Tareas</span>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col ">
                    <span className="text-2xl">Pendientes</span>
                    {stats?.amountOfAsignedTasks}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl">Completadas</span>
                    {stats?.amountOfCompletedTasks}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl">Archivadas</span>
                    {stats?.archivedTasks}
                  </div>
                </div>
              </div>
              {/* Seccion promedio */}
              <div className="flex h-min flex-col items-start gap-4 rounded-md  p-4 ">
                <div className="w-full">
                  <span className="text-3xl">Promedio</span>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col ">
                    <span className="text-2xl">Tiempo para completar una tarea</span>
                    {
                      averageTimeToString(stats?.averageTime)
                    }
                  </div>
                </div>
              </div>
              {/* Seccion prioridades */}
              <div className="flex h-min flex-col items-start gap-4 rounded-md  p-4 ">
                <div className="w-full">
                  <span className="text-3xl">Prioridades</span>
                </div>
                <div className="flex gap-4 flex-col">
                  <div className="flex ">
                    <span className="text-2xl">Sin prioridad</span>
                    <span>{stats?.noPriority}</span>
                  </div>
                  <div className="flex">
                    <span className="text-2xl">Baja</span>
                    {stats?.lowPriority}
                  </div>
                  <div className="flex">
                    <span className="text-2xl">Media</span>
                    {stats?.mediumPriority}
                  </div>
                  <div className="flex">
                    <span className="text-2xl">Alta</span>
                    {stats?.highPriority}
                  </div>
                  <div className="flex">
                    <span className="text-2xl">Urgente</span>
                    {stats?.urgentPriority}
                  </div>
                </div>
                </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
