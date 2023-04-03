import Link from "next/link";

import { useState } from "react";




export default function Page() {

  const [projects, setProjects] = useState([]);
  const projects = fetch("http://localhost:3000/api/proyectos.php")
    .then((res) => res.json())
    .then((data) => {
      
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