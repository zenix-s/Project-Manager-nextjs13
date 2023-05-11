import HeaderProjects from "@/components/proyectos/headerProjects";
import NewProjectForm from "@/components/modals/newProjectModal";
import BodyProjects from "@/components/proyectos/bodyProjects";
import getProyectos from "@/actions/getProyectos";
import { ProjectProps } from "@/types";

const Page = async () => {
  const proyectos = await getProyectos();
  console.log(proyectos);

  return (
    <section className="flex h-full w-full flex-col overflow-hidden">
      <HeaderProjects />
      <NewProjectForm />
      <BodyProjects 
        proyectos={proyectos}
      />
    </section>
  );
};

export default Page;
