'use client';
import { FiPlusCircle } from "react-icons/fi";
import Button from "../button";
const NewCol = () => {
  return (
    <div className="min-w-[300px]">
      <Button
        label="Agregar estado"
        theme="light"
        onClick={() => {}}
        fullWidth
        center
        icon={FiPlusCircle}
      />
    </div>
  );
};
export default NewCol;
