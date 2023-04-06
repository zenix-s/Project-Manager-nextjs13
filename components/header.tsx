

export default function Header({ ruta }) {
  return (
    <header>
      <div>
        <a href="/">dashboard</a>
        <span> / </span>
        <a href={ ruta.path }>
          { ruta.name }
        </a>
      </div>
    </header>
  )
}