import { getProyectos } from "../../actions/getProyectos";
import CardProyecto from "../../components/proyectos/cardproyecto";
import NewProjectForm from "../../components/proyectos/formularionuevoproyecto";
import Header from "../../components/header";
import getCurrentUser from "../../actions/getCurrentUser";
import { redirect } from "next/navigation";

export default async function Page() {
  const id = await getCurrentUser();

  if (!id) {
    redirect("/");
  }

  const proyectos = await getProyectos();

  return (
    <>
      <section
        className="
      flex
      h-full
      flex-col
    "
      >
        <Header
          ruta={[
            {
              path: "/",
              name: "Dashboard",
              actual: false,
            },
            {
              path: "/proyectos",
              name: "Proyectos",
              actual: true,
            },
          ]}
        />
        <div
          className="
        
      "
        >
          <NewProjectForm visible={false} />
        </div>
        <div
          className="
        flex
        flex-wrap
        items-start
        justify-start 
        overflow-y-scroll
        p-2
      "
        >
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
    </>
  );
}
