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
  onChangeState: ({ updatedState }: { updatedState: StateProps }) => void;
  onDeleteState: ({ stateId }: { stateId: number }) => void;
}

const EstadoListItem = ({
  estado,
  idProject,
  onChangeState,
  onDeleteState,
}: EstadoListItemProps) => {
  const [estadoLoading, setEstadoLoading] = useState(false);
  const router = useRouter();

  const [estadoColor, setEstadoColor] = useState(estado.color);

  const onChangeColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeState({
      updatedState: {
        ...estado,
        color: e.target.value,
      },
    });

    // setEstadoLoading(true);
    // const color = e.target.value;
    // estado = {
    //   ...estado,
    //   color,
    // };

    // axios
    //   .put("/api/proyectos/estado", estado)
    //   .then((res) => {
    //     setEstadoLoading(false);
    //     router.refresh();
    //   })
    //   .catch((err) => {
    //     console.error("Error:", err);
    //     setEstadoLoading(false);
    //   })
    //   .finally(() => {
    //     setEstadoLoading(false);
    //   });
  };

  // const onDeleteEstado = () => {
  //   setEstadoLoading(true);

  //   axios
  //     .delete("/api/proyectos/estado", {
  //       headers: {
  //         id_estado: estado.id.toString(),
  //       },
  //     })
  //     .then((res) => {
  //       if (res.data.status === 200) {
  //         toast.success(res.data.message);
  //       }
  //       if (res.data.status !== 200) {
  //         toast.error(res.data.message);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error("Error:", err);
  //       setEstadoLoading(false);
  //     })
  //     .finally(() => {
  //       setEstadoLoading(false);
  //       router.refresh();
  //     });
  // };


  const DropdownColor = () => {
    return (
      <div className="dropdown">
        <label
          tabIndex={0}
          className="btn w-56 justify-start"
          style={{
            backgroundColor: getHexColor(estadoColor),
          }}
        >
          <span
            className="text-lg text-white"
            style={{
              textShadow: "0px 0px 2px #000000",
            }}
          >
            {estado.name}
          </span>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content bg-slate-800 h-60 overflow-y-auto w-full grid grid-cols-2 gap-4 p-3"
        >
          {Colors.map((color) => (
            <li key={estado.id}>
              <button
                className={`
                  w-20
                  h-20
                  ${estadoColor === color ? "ring-2 ring-offset-2 ring-white" : ""}
                `}
                style={{
                  backgroundColor: getHexColor(color),
                }}
                onClick={() => {
                  setEstadoColor(color);
                  onChangeState({
                    updatedState: {
                      ...estado,
                      color,
                    },
                  });
                }}
              >
                
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-60">{estado.name}</div>
        {/* <select
          defaultValue={estado.color}
          className="select-bordered select w-52 text-lg uppercase "
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
                fontSize: "1.5rem",
                textShadow: "0 0 1px black",
              }}
            >
              {estadoLoading ? "cargando..." : color}
            </option>
          ))}
        </select> */}
        <DropdownColor />
      </div>
      <div>
        <Button
          onClick={() => {
            onDeleteState({ stateId: estado.id });
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
