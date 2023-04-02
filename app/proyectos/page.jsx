import Link from "next/link";





export default function Page() {

  // fetch the list of projects from the api proyectos.php in api folder 
  const projects = fetch("http://localhost:3001/api/proyectos.php")
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  return (
    <div>
      <h1>Proyectos</h1>
      <p>Lista proyectos</p>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link href="/proyectos/[id]" as={`/proyectos/${project.id}`}>
              <a>{project.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}