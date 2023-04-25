'use client';
import NewProjectForm from "../modals/newProjectModal";
import { useModal } from "@/hooks/useModal";
import Button from "@/components/button";
const HeaderProjects = () => {
  const { isShowing, onOpen, onClose } = useModal();
  return(
    <>
    <NewProjectForm isOpen={isShowing} onClose={onClose} />
      <div className="flex items-center justify-between p-4">
        <Button
          label="Nuevo Proyecto"
          theme="light"
          onClick={onOpen}
          center
          shadow
          uppercase
        />
      </div>
    </>
  )
}

export default HeaderProjects;