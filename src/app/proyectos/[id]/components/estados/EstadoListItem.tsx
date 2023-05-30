"use client";
import { StateProps } from "@/types";
import { Colors, getBgColor, getHexColor } from "@/actions/getColors";
import { useState } from "react";
import {
  VscChromeMinimize,
  VscEdit,
  VscSave,
} from "react-icons/vsc";
import Button from "@/components/button";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";

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
  const [editingName, setEditingName] = useState(false);

  const [estadoColor, setEstadoColor] = useState(estado.color);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FieldValues>({
    defaultValues: {
      name: estado.name,
      color: estado.color,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    onChangeState({
      updatedState: {
        ...estado,
        name: data.name,
        color: data.color,
      },
    });
  };

  return (
    <tr>
      <td>
        <div className="flex">
          <div className="flex h-full w-full items-center">
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
              className="input-bordered input w-full text-lg"
              defaultValue={estado.name}
              {...register("name", { required: true })}
            />
          </div>
          <div
            className={`
              ${editingName ? "flex" : "hidden"}
            `}
          >
            <Button
              theme="primary"
              icon={editingName ? VscSave : VscEdit}
              onClick={() => {
                setEditingName(!editingName);
                handleSubmit(onSubmit)();
              }}
            />
          </div>
        </div>
      </td>
      <td>
        <input
          type="checkbox"
          className={`
              checkbox-primary
              checkbox
            `}
          defaultChecked={estado.autoComplete}
          checked={estado.autoComplete}
          onChange={(e) => {
            onChangeState({
              updatedState: {
                ...estado,
                autoComplete: e.target.checked,
              },
            });
          }}
        />
      </td>

      <td>
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
            className="dropdown-content grid h-60 w-full grid-cols-2 gap-4 overflow-y-auto bg-slate-800 p-3"
          >
            {Colors.map((color) => (
              <li key={color}>
                <button
                  className={`
                    h-20
                    w-20
                    ${
                      estadoColor === color
                        ? "ring-2 ring-white ring-offset-2"
                        : ""
                    }
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
                ></button>
              </li>
            ))}
          </ul>
        </div>
      </td>
      <td>
        <Button
          onClick={() => {
            onDeleteState({ stateId: estado.id });
          }}
          loading={estadoLoading}
          label="eliminar"
          icon={VscChromeMinimize}
          theme="error"
        />
      </td>
    </tr>
  );
};

export default EstadoListItem;
