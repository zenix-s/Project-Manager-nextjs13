"use client";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { InputProps } from "@/types";

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  required,
  register,
  errors,
}) => {
  return (
    <div className="form-control">
      <label
        htmlFor={id}
        className=""
      >
        <span className="label-text">{label}</span>
        {errors[id] && (
          <span className="text-red-600 textx-label-alt">Este campo es obligatorio</span>
        )}
      </label>
      <input
        type={type}
        placeholder=" "
        {...register(id, { required })}
        id={id}
        className="input input-bordered w-full"
      />
    </div>
  );
};

export default Input;
