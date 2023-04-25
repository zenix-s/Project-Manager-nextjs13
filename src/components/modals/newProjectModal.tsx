"use client";
import ModalContainer from "./modalcontainer";
import useProjectsModal from "@/hooks/useProjectsModal";



const NewProjectForm = () => {
  const ProjectsModal = useProjectsModal();
  return (
    <ModalContainer
      title="Nuevo Proyecto"
      body={<h1>hola</h1>}
      actionlabel="Crear"
      onSubmit={() => {}}
      visible={
        ProjectsModal.isOpen
      }
      onClose={
        ProjectsModal.onClose
      }
    />
  );
};

export default NewProjectForm;
