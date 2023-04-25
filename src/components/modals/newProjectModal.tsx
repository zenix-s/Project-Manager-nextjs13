"use client";
import ModalContainer from "./modalcontainer";

interface NewProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewProjectForm: React.FC<NewProjectFormProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <ModalContainer
      title="Nuevo Proyecto"
      body={<h1>hola</h1>}
      actionlabel="Crear"
      onSubmit={() => {}}
      visible={isOpen}
      onClose={onClose}
    />
  );
};

export default NewProjectForm;
