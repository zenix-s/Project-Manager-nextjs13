import Link from "next/link";
const proyectos = [
  { to: "/proyectos/1", label: "Proyecto 1" },
  { to: "/proyectos/2", label: "Proyecto 2" },
  { to: "/proyectos/3", label: "Proyecto 3" },
  { to: "/proyectos/4", label: "Proyecto 4" },


];

// get the list of projects from the database and display them 
const getStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/proyectos");
  const proyectos = await res.json();
};


export default function Page() {
  return (
    <div>
      <h1>Proyectos</h1>
      <p>Lista proyectos</p>
      <ul>
        {proyectos.map(({ to, label }) => (
          <li key={to}>
            <Link href={to}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}