
export async function getProyectos() {
  const res = await fetch("http://localhost:3000/api/proyectos")
  const proyectos = await res.json()
  // await new Promise((resolve) => setTimeout(resolve, 1000))
  return proyectos
}

