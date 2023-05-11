import Tasks from "./components/Tasks";
import getTareas from "@/actions/getTareas";
import getEstados from "@/actions/getEstados";
import getTeamMembers from "@/actions/getTeamMembers";
import { ProjectExists } from "@/actions/getProyectos";
import getCurrentUser, {
  getPermissionsForProject,
} from "@/actions/getCurrentUser";
import { redirect, notFound } from "next/navigation";

interface paramsProps {
  id: number;
}

const Page = async ({ params }: { params: paramsProps }) => {
  const user = await getCurrentUser();
  const { id } = params;

  const BoolProjectExists = await ProjectExists(parseInt(id.toString()));

  if ( !BoolProjectExists ) {
    notFound();
  }
  
  const permission = await getPermissionsForProject(parseInt(id.toString()));

  if ( !permission ) {
    redirect("/proyectos");
  }






  const tareas = await getTareas(id);
  const estados = await getEstados(id);
  const teamMembers = await getTeamMembers(id);

  return (
    <>
      <section className="flex h-full flex-col">
        <Tasks
          tareas={tareas}
          estados={estados}
          teamMembers={teamMembers}
          idProject={parseInt(id.toString())}
        />
      </section>
    </>
  );
};

export default Page;
