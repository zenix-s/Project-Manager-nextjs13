import { getProyectos } from "@/app/lib/get-proyectos";

export default async function AllProyectos() {
  const proyectos = await getProyectos();
  return (
    <div>
      <h2>Lista de Proyectos</h2>
      <ul>
        {proyectos.map((proyecto) => (
          <li key={proyecto.id}>
            {proyecto.name}
          </li>
        ))}
      </ul>
    </div>
  );
}