import getProyectos from "../../actions/getProyectos";
import CardProyecto from "../../components/proyectos/cardproyecto";
import NewProjectForm from "../../components/proyectos/formularionuevoproyecto";




const Page = async () => {
  const proyectos = await getProyectos();

  return (
    <section
      className="
      flex
      flex-col
      h-full
      overflow-hidden
      w-full
    "
    >
      <div className="">
        <NewProjectForm visible={false} />
      </div>
      <div className="w-full overflow-y-scroll p-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
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
