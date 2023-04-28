'use client';
import { VscAdd } from "react-icons/vsc";
import Button from "../../button";
const NewCol = () => {
  return (
    <div className="min-w-[300px]">
      <Button
        label="Agregar estado"
        theme="light"
        textColor="black"
        hoverEffect="whiter"
        onClick={() => {}}
        fullWidth
        center
        icon={VscAdd}
      />
    </div>
  );
};
export default NewCol;
