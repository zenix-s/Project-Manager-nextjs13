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
          theme="primary"
          onClick={ProjectModal.onOpen}
          center
        />
      </div>
    </>
  );
};

export default HeaderProjects;
