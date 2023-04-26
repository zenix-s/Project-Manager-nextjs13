"use client";
import ModalContainer from "./modalcontainer";
import useProjectsModal from "@/hooks/useProjectsModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";




const NewProjectForm = () => {
  const ProjectsModal = useProjectsModal();
  const body = (
    <h1>Hola</h1>  
  );
  return (
    <ModalContainer
      title="Nuevo Proyecto"
      body={body}
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
