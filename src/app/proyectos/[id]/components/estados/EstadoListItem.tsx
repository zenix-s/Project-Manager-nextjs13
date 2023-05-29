"use client";
import { StateProps } from "@/types";
import { Colors, getBgColor, getHexColor } from "@/actions/getColors";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { VscKebabVertical, VscChromeMinimize, VscEdit, VscSave } from "react-icons/vsc";
import toast, { Toaster } from "react-hot-toast";
import Button from "@/components/button";
import { set } from "react-hook-form";
import axios from "axios";
import useStateModal from "@/hooks/useStateModal";
import Input from "@/components/inputs/input";

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
  const StateModal = useStateModal();
  const [estadoLoading, setEstadoLoading] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const router = useRouter();

  const [estadoColor, setEstadoColor] = useState(estado.color);


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
        <div className="w-60 flex">
          <div className="w-full h-full flex items-center">
            <span 
              className={`w-full ${editingName ? "hidden" : "text-lg"}`}
              onClick={() => {
                setEditingName(!editingName);
              }}
            >
                {estado.name}
            </span>
            <input 
              type={editingName ? "text" : "hidden"} 
              className="input input-bordered w-full text-lg"
              defaultValue={estado.name}
            />
              

              
          </div>
          <div className={`
            ${editingName ? "flex" : "hidden"}
          `}>
            <Button
              theme="primary"
              icon={ editingName ? VscSave : VscEdit}
              onClick={() => {
                setEditingName(!editingName);
              }}
            />
          </div>
        </div>
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
      <div className="flex">
        <Button
          theme="primary"
          label="editar"
          icon={VscKebabVertical}
          onClick={() => {
            StateModal.onOpen(estado);    
          }}
        />
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
