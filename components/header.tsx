import "../styles/navbar-route.css";

function HeaderRouteItem(ruta) {
  if (ruta.actual) {
    return (
      <>
        <span> / {ruta.name}</span>
      </>
    );
  } else {
    return (
      <>
        <span> / </span>
        <a href={ruta.path} className="route-anchor">{ruta.name}</a>
      </>
    );
  }
}

export default function Header({ ruta }) {
  return (
    <nav className="navbar-route">
      <div>
        <a href="/">Dashboard</a>

        {ruta.map((ruta, index) => (
          <HeaderRouteItem key={index} {...ruta} />
        ))}
      </div>
    </nav>
  );
}
