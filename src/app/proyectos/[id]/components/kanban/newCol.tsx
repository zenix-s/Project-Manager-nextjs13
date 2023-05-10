'use client';
import { VscAdd } from "react-icons/vsc";
import Button from "@/components/button";
const NewCol = () => {
  return (
    <div className="min-w-[300px]">
      <Button
        label="Agregar estado"
        theme="secondary"
        onClick={() => {}}
        fullWidth
        center
        icon={VscAdd}
      />
    </div>
  );
};
export default NewCol;
