import { getProyectos } from "@/lib/get-proyectos";


export default async function Page() {
  const proyectos = await getProyectos();
  return (
    <div>
      <h1>Proyectos</h1>
      <p>Lista proyectos</p>
      <ul>
        {proyectos.map((proyecto) => (
          <li key={proyecto.id}>{proyecto.name}</li>
        ))}
      </ul>
    </div>
  );
}

