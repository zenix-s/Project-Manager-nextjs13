import { getProyectos } from "../../lib/get-proyectos";
import CardProyecto from "../../components/cardproyecto";
import Header from "../../components/header";
import "../../styles/proyectos.css";

export default async function Page() {
  const proyectos = await getProyectos();
  return (
    <section className="proyectos-container">
      
      <Header 
        ruta={
          [
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