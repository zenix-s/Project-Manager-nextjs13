"use client";
import { EstadoProps } from "@/types";
import { time } from "console";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/button";
const { Colors, getBgColor, getHexColor } = require("@/actions/getColors");

interface FormNewEstadoProps {
  idProject: Number;
}

const FormNewEstado: React.FC<FormNewEstadoProps> = ({ idProject }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      nombre: "",
      color: "",
      id_proyecto: idProject,
    },
  });

  const CleanInputs = () => {
    setValue("nombre", "");
    setValue("color", "");
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);

    const newEstado = {
      nombre: data.nombre,
      color: data.color,
      id_proyecto: idProject,
    };

    fetch("http://localhost:3000/api/proyectos/estado", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEstado),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        CleanInputs();
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
      .finally(() => {
        console.log("finally");
        console.log("newEstado: ", newEstado);
      });
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
        <div>
          <input
            type="text"
            className="input-bordered input"
            placeholder="Nombre del estado"
            {...register("nombre", { required: true })}
          />
        </div>
        <div>
          <select
            {...register("color", { required: true })}
            className="select-bordered select"
            defaultValue="Selecciona un color"
          >
            <option disabled>Selecciona un color</option>
            {Colors.map((color: string) => (
              <option
                key={color}
                value={color}
                style={{
                  backgroundColor: getHexColor(color),
                }}
              >
                {color}
              </option>
            ))}
          </select>
        </div>
        <Button
          type="submit"
          disabled={loading}
          loading={loading}
          theme="primary"
          label={loading ? "Cargando..." : "Crear estado"}
        />
      </form>
    </div>
  );
};

export default FormNewEstado;
