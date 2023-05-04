"use client";
import Button from "@/components/button";
import useTasksModal from "@/hooks/useTasksModal";
const HeaderTasksList = () => {
  const TaskModal = useTasksModal();
  return (
    <div className="flex items-center justify-between">
      <h1>Tareas</h1>
      <Button
        label="Nueva tarea"
        onClick={() => TaskModal.onOpen()}
        theme="light"
        textColor="black"
      />
    </div>
  );
};

export default HeaderTasksList;