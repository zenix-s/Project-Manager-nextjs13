"use client";
import { StateProps } from "@/types";
import { Colors, getBgColor, getHexColor } from "@/actions/getColors";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { VscKebabVertical, VscChromeMinimize } from "react-icons/vsc";
import toast, { Toaster } from "react-hot-toast";
import Button from "@/components/button";
import { set } from "react-hook-form";
import axios from "axios";

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

    axios
      .put("/api/proyectos/estado", estado)
      .then((res) => {
        setEstadoLoading(false);
        router.refresh();
      })
      .catch((err) => {
        console.error("Error:", err);
        setEstadoLoading(false);
      })
      .finally(() => {
        setEstadoLoading(false);
      });
  };


  const onDeleteEstado = () => {
    setEstadoLoading(true);

    axios
      .delete("/api/proyectos/estado", {
        headers: {
          id_estado: estado.id.toString(),
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          toast.success(res.data.message);
        }
        if(res.data.status !== 200){
          toast.error(res.data.message);
        }

      })
      .catch((err) => {
        console.error("Error:", err);
        setEstadoLoading(false);
      })
      .finally(() => {
        setEstadoLoading(false);
        router.refresh();
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
