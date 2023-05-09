import Tasks from "@/components/Tareas/Tasks";
import getTareas from "@/actions/getTareas";
import getEstados from "@/actions/getEstados";
import getTeamMembers from "@/actions/getTeamMembers";

interface paramsProps {
  id: number;
}

const Page = async ({params}: {params: paramsProps}) => {

  const { id } = params;

  const tareas = await getTareas(id);
  const estados = await getEstados(id);
  const teamMembers = await getTeamMembers(id);

  console.log(estados);

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
