"use client";
import Link from "next/link";
import "../styles/navbar-route.css";
import { SlMenu } from "react-icons/sl";
function HeaderRouteItem(ruta) {
  if (ruta.actual) {
    return (
      <>
        <span className="actual-route"> / {ruta.name}</span>
      </>
    );
  } else {
    return (
      <>
        <span> / </span>
        <Link href={ruta.path}>
          <span>{ruta.name}</span>
        </Link>
      </>
    );
  }
}

export default function Header({ ruta }) {
  return (
    <nav className="navbar-route">
      <div>
        {ruta.map((ruta, index) => (
          <HeaderRouteItem key={index} {...ruta} />
        ))}
      </div>
      <div>
        <button
          className="sidebar-action-button"
          onClick={() => {
            const sidebar = document.getElementById("sidebar");
            if (sidebar) sidebar.classList.toggle("show-aside");
          }}
        >
          <SlMenu />
        </button>
      </div>
    </nav>
  );
}
