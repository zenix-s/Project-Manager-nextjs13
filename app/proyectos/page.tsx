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
    <section className="
      flex
      flex-col
      h-full
    ">
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
      <div className="
        
      ">
       <NewProjectForm visible={false} />
      </div>
      <div className="
        flex
        justify-start
        items-start
        flex-wrap
        
        p-2
        overflow-y-scroll
      ">
        {proyectos.map((proyecto) => (
          <CardProyecto key={proyecto.id} 
            name={proyecto.name}
            description={proyecto.description}
            endDate={proyecto.endDate.toLocaleDateString()}
          />
        ))}
      </div>
    </section>
    </>
  );
}
