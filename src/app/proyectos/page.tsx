import getProyectos from "../../actions/getProyectos";
import CardProyecto from "../../components/proyectos/cardproyecto";
import NewProjectForm from "../../components/proyectos/formularionuevoproyecto";

const Page = async () => {
  const proyectos = await getProyectos();

  return (
    <section
      className="
      flex
      h-full
      w-full
      flex-col
      overflow-hidden
    "
    >
      <div className="">
        <NewProjectForm visible={false} />
      </div>
      <div className="grid w-full grid-cols-1 gap-4 overflow-y-scroll p-2 md:grid-cols-2 xl:grid-cols-3">
        {proyectos.map((proyecto) => (
          <CardProyecto
            key={proyecto.id}
            name={proyecto.name}
            description={proyecto.description}
            endDate={proyecto.endDate.toLocaleDateString()}
            idProyecto={proyecto.id.toString()}
            rol={proyecto.asignaciones[0].rol}
          />
        ))}
      </div>
    </section>
  );
};

export default Page;
