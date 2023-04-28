"use client";
import NewProjectForm from "../modals/newProjectModal";
import useProjectsModal from "@/hooks/useProjectsModal";
import Button from "@/components/button";
const HeaderProjects = () => {
  const ProjectModal = useProjectsModal();
  return (
    <>
      <div className="flex items-center justify-between p-4">
        <Button
          label="Nuevo Proyecto"
          theme="light"
          textColor="black"
          hoverEffect="whiter"
          onClick={ProjectModal.onOpen}
          center
          shadow
          uppercase
        />
      </div>
    </>
  );
};

export default HeaderProjects;
