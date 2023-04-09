import { getProyectos } from "../../lib/get-proyectos";
import CardProyecto from "../../components/cardproyecto";
import Header from "../../components/header";
import "../../styles/proyectos.css";
import getCurrentUser from "../../actions/getCurrentUser";
import { redirect } from "next/navigation";

export default async function Page() {
  const id = await getCurrentUser();

  if (!id) {
    redirect("/");
    return null;
  }

  const proyectos = await getProyectos();
  return (
    <section className="proyectos-container">
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
      <div className="lista-proyectos-container">
        {proyectos.map((proyecto) => (
          <CardProyecto key={proyecto.id} proyecto={proyecto} />
        ))}
      </div>
    </section>
  );
}
