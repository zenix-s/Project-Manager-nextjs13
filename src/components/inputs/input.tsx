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
    <div className="relative mt-6 mb-3 w-full text-md">
      <input
        type={type}
        placeholder=" "
        {...register(id, { required })}
        className="focus:shadow-outline peer h-10 w-full rounded-lg border px-2 text-gray-700 placeholder-gray-400"
        id={id}
      />
      <label
        htmlFor={id}
        className="absolute -top-5 left-2 cursor-text text-gray-200 peer-placeholder-shown:text-gray-500 peer-focus:text-gray-200 transition-all peer-placeholder-shown:top-2.5 peer-focus:-top-5"
      >
        {label} {errors[id] && <span className="text-red-600">Este campo es obligatorio</span>}
      </label>
    </div>
  );
};

export default Input;
