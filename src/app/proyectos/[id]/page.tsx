import Tasks from "@/components/Tareas/Tasks";
import getTareas from "@/actions/getTareas";
import getEstados from "@/actions/getEstados";

interface paramsProps {
  id: number;
}

const Page = async ({params}: {params: paramsProps}) => {

  const { id } = params;

  const tareas = await getTareas(id);
  const estados = await getEstados(id);



  return (
    <>
      <section className="flex h-full flex-col">
        <Tasks
          tareas={tareas}
          estados={estados}
        />
      </section>
    </>
  );
};

export default Page;
