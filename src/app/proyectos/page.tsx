import getProyectos from "../../actions/getProyectos";
import CardProyecto from "../../components/proyectos/cardproyecto";
// import NewProjectForm from "../../components/proyectos/formularionuevoproyecto";
import NewProjectForm from "@/components/modals/newProjectModal";

interface ProyectoProps {
  id: number;
  name: string;
  description: string;
  creationDate: string;
  endDate: string;
  asignaciones: any[];
}

const Page = async () => {
  const proyectos = await getProyectos();

  if (!proyectos) {
    return <div>Proyectos no encontrados</div>;
  }

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
      {/* <NewProjectForm /> */}
      {/* <div className="">
        <NewProjectForm visible={false} />
      </div> */}
      <div className="grid w-full grid-cols-1 gap-4 overflow-y-scroll p-2 md:grid-cols-2 xl:grid-cols-3">
        {proyectos.map((proyecto: ProyectoProps) => (
          <CardProyecto
            key={proyecto.id}
            name={proyecto.name}
            description={proyecto.description}
            endDate={
              new Date(proyecto.endDate).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }) || "Sin fecha de entrega"
            }
            idProyecto={proyecto.id.toString()}
            rol={proyecto.asignaciones[0].rol}
          />
        ))}
      </div>
    </section>
  );
};

export default Page;
