import { getProyectos } from "../../lib/get-proyectos";
import CardProyecto from "../../components/cardproyecto";
import Header from "../../components/header";
import "../../styles/proyectos.css";
import { type } from "os";



export default async function Page() {
  const proyectos = await getProyectos();
  return (
    <section className="proyectos-container">
      
      <Header 
        ruta={
          [
            {
              path: "/",
              name: "Dashboard",
              actual: false
            },
            {
              path: "/proyectos",
              name: "Proyectos",
              actual: true
            }
          ]
        }
      />
      <div className="lista-proyectos-container">
        {proyectos.map((proyecto) => (
          <CardProyecto key={proyecto.id} proyecto={proyecto} />
        ))}
      </div>
    </section>
  );
}