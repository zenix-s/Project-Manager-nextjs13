'use client'
import ModalContainer from "./modalcontainer";

const NewProjectForm = () => {
  return (
    <ModalContainer
      title="Nuevo Proyecto"
      body={<h1>hola</h1>}
      actionlabel="Crear"
      onSubmit={() => {}}
      visible={true}
    />
  );
};

export default NewProjectForm;