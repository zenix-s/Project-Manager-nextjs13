"use client";
import { StateProps } from "@/types";
import { Colors, getBgColor, getHexColor } from "@/actions/getColors";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { VscKebabVertical, VscChromeMinimize } from "react-icons/vsc";
import toast, { Toaster } from "react-hot-toast";
import Button from "@/components/button";
import { set } from "react-hook-form";

interface EstadoListItemProps {
  estado: StateProps;
  idProject: number;
}

const EstadoListItem = ({ estado, idProject }: EstadoListItemProps) => {
  const [estadoLoading, setEstadoLoading] = useState(false);
  const router = useRouter();
  const onChangeColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEstadoLoading(true);
    const color = e.target.value;
    estado = {
      ...estado,
      color,
    };
    fetch(`http://localhost:3000/api/proyectos/estado`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(estado),
    })
      .then((response) => response.json())
      .then((data) => {
        router.refresh();
        setEstadoLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const ToastDelete = () => {
    console.log("toast");
    toast.success("Estado eliminado");
  };

  const onDeleteEstado = () => {
    setEstadoLoading(true);

    fetch(`http://localhost:3000/api/proyectos/estado`, {
      method: "DELETE",
      headers: {
        id_estado: estado.id.toString(),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) return toast.error(data.error);
        setEstadoLoading(false);
        toast.success("Estado eliminado");
        router.refresh();
      })
      .catch((error) => {
        console.error("Error:", error);
        setEstadoLoading(false);
        router.refresh();
      })
      .finally(() => {
        setEstadoLoading(false);
      });
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-60">{estado.name}</div>
        <select
          defaultValue={estado.color}
          className="select-bordered select w-52"
          style={{
            backgroundColor: getHexColor(estado.color),
          }}
          onChange={onChangeColor}
          disabled={estadoLoading}
        >
          {Colors.map((color) => (
            <option
              key={color}
              value={color}
              style={{
                backgroundColor: getHexColor(color),
              }}
            >
              {estadoLoading ? "cargando..." : color}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Button
          onClick={() => {
            onDeleteEstado();
          }}
          loading={estadoLoading}
          label="eliminar"
          icon={VscChromeMinimize}
          theme="error"
        />
      </div>
    </div>
  );
};

export default EstadoListItem;
