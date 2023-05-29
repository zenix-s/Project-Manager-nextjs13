"use client";
import React, { use, useEffect, useState } from "react";
import useStateModal from "@/hooks/useStateModal";
import { VscChromeClose, VscChevronDown, VscEdit } from "react-icons/vsc";
import { StateProps } from "@/types";
import Button from "@/components/button";
import Input from "@/components/inputs/input";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";
import { getHexColor, getBgColor } from "@/actions/getColors";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Colors } from "@/actions/getColors";

// export interface StateProps {
//   id: number;
//   name: string;
//   projectId: number;
//   color: string;
//   autoComplete: boolean;
// }

interface StateModalProps {
  projectId: number;
}

const StateModal: React.FC<StateModalProps> = ({ projectId }) => {
  const StateModal = useStateModal();
  const router = useRouter();
  const state = StateModal.state;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FieldValues>({
    defaultValues: {
      // name: Task ? Task.name : "",
      // description: Task ? Task.description : "",
      // endDate: Task ? Task.endDate : "",
      // completed: Task ? Task.completed : false,
      // stateId: Task ? Task.stateId : 0,
      // projectId: Task ? Task.projectId : 0,
      // userId: Task ? Task.userId : 0,
      // archived: Task ? Task.archived : false,
      // createdDate: Task ? Task.createdDate : new Date(),

      name: state ? state.name : "",
      color: state ? state.color : "",
      autoComplete: state ? state.autoComplete : false,
    },
  });

  const emptyState = {
    id: 0,
    projectId: 0,
    name: "Selecciona un estado",
    color: "grey",
    autoComplete: false,
  };

  const [show, setShow] = useState(StateModal.isOpen);

  useEffect(() => {
    setShow(StateModal.isOpen);
    // setValue("name", Task ? Task.name : "");
    // setValue("description", Task ? Task.description : "");
    // setValue("endDate", Task ? Task.endDate?.toISOString().split("T")[0] : "");
    setValue("name", state ? state.name : "");
    setValue("color", state ? state.color : "");
    setValue("autoComplete", state ? state.autoComplete : false);
  }, [StateModal.isOpen, setValue, state, getValues]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };

  const onClose = () => {
    // setValue("name", "");
    // setValue("description", "");
    // setValue("endDate", "");

    setValue("name", "");
    setValue("color", "");
    setValue("autoComplete", false);

    StateModal.setState(emptyState);
    StateModal.onClose();
  };

  return (
    <>
      <div
        className={`
        modal
        ${show ? "modal-open" : ""}
      `}
      >
        <div className="modal-box flex relative min-h-[550px]">
          <div className="absolute right-2 top-2">
            <Button
              theme="ghost"
              icon={VscChromeClose}
              circle
              center
              fontSize="lg"
              onClick={() => {
                onClose();
              }}
            />
          </div>
          <form
            className="flex flex-grow w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="
              flex
              flex-col
              justify-between
              h-full
              w-full
            ">
              <div>
                <h3 className="text-lg font-bold">
                  {state ? state.name : "Nuevo estado"}
                </h3>
              </div>
              <div className="
                w-full
                h-full
                mt-8
                flex
                flex-col
                gap-8
              ">
                <Input
                  label="Nombre *"
                  id="name"
                  type="text"
                  register={register}
                  errors={errors}
                  required
                />
                <div className="dropdown">
                  <label
                    tabIndex={0}
                    className="btn w-full justify-between"
                    style={
                      {
                        // backgroundColor: getHexColor(estadoColor),
                      }
                    }
                  >
                    <span
                      className="text-lg text-white"
                      style={{
                        textShadow: "0px 0px 2px #000000",
                      }}
                    >
                      hola mundo
                    </span>
                    <VscChevronDown className="text-xl" />
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
                      `}
                          // ${estadoColor === color ? "ring-2 ring-offset-2 ring-white" : ""}
                          style={{
                            backgroundColor: getHexColor(color),
                          }}
                          onClick={() => {
                            console.log(color);
                          }}
                        ></button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Auto completar</span>
                    <input
                      className="checkbox"
                      type="checkbox"
                      // checked
                      {...register("autoComplete")}
                      {...(state &&
                        state.autoComplete && { defaultChecked: true })}
                    />
                  </label>
                </div>
              </div>
              <div>
                <Button
                  theme="primary"
                  type="submit"
                  // label={Task ? "Guardar" : "Crear"}
                  label={state ? "Guardar" : "Crear"}
                  fullWidth
                  center
                  fontSize="lg"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default StateModal;
