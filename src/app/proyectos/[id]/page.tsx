import Tareas from "@/components/tareas/tareas";
import getTareas from "@/actions/getTareas";
const Page = async () => {

  const tareas = await getTareas(1);
  console.log(tareas);
  return (
    <>
      <section className="flex h-full flex-col">
        <Tareas
          tareas={tareas}
        />
      </section>
    </>
  );
};

export default Page;
