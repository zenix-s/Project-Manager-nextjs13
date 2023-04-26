import Kanban from "@/components/kanban/kanban";
import getTareas from "@/actions/getTareas";
import getEstados from "@/actions/getEstados";
import { headers } from "next/headers";

interface paramsProps {
  id: number;
}

const Page = async ({params}: {params: paramsProps}) => {

  const { id } = params;

  const tareas = await getTareas(id);
  const estados = await getEstados(id);

  console.log(estados);

  return (
    <>
      <section className="flex h-full flex-col">
        <Kanban
          tareas={tareas}
          estados={estados}
        />
      </section>
    </>
  );
};

export default Page;
