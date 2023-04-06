export default function CardProyecto({ proyecto }) {
  return (
    <a className="card-proyecto" href="#">
      <h1>{proyecto.name}</h1>
      <p>{proyecto.description}</p>
      <p>{proyecto.endDate}</p>
    </a>
  );
}