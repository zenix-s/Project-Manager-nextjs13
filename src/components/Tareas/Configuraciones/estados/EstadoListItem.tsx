"use client";
import { EstadoProps } from "@/types";
import { Colors, getBgColor, getHexColor } from "@/actions/getColors";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { VscKebabVertical } from "react-icons/vsc";
import toast, { Toaster } from "react-hot-toast";
import { set } from "react-hook-form";

interface EstadoListItemProps {
  estado: EstadoProps;
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
        <div className="w-60">{estado.nombre}</div>
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
        <div className="dropdown-bottom dropdown-end dropdown">
          <label className="btn-ghost btn" tabIndex={estado.id}>
            <VscKebabVertical />
          </label>
          <ul
            className="dropdown-content menu rounded-box bg-base-100 p-2 shadow "
            tabIndex={estado.id}
          >
            <li>
              <button
                onClick={() => {
                  onDeleteEstado();
                }}
              >
                eliminar
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EstadoListItem;
