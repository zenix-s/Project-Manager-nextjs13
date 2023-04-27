'use client';
import { FiPlusCircle } from "react-icons/fi";
import Button from "../button";
const NewCol = () => {
  return (
    <div className="min-w-[300px]">
      <Button
        label="Agregar estado"
        theme="dark"
        textColor="white"
        hoverEffect="whiter"
        onClick={() => {}}
        fullWidth
        center
        icon={FiPlusCircle}
      />
    </div>
  );
};
export default NewCol;
