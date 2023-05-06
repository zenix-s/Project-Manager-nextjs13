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
    <div className="text-md relative mb-3 mt-6 w-full">
      <input
        type={type}
        placeholder=" "
        {...register(id, { required })}
        id={id}
        className="focus:shadow-outline text-lg peer w-full rounded-lg border px-2 py-3 text-gray-700 placeholder-gray-400"
      />
      <label
        htmlFor={id}
        className="absolute -top-6 text-lg left-2 cursor-text text-gray-200 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-500 peer-focus:-top-6 peer-focus:text-gray-200"
      >
        {label}{" "}
        {errors[id] && (
          <span className="text-red-600">Este campo es obligatorio</span>
        )}
      </label>
    </div>
  );
};

export default Input;
