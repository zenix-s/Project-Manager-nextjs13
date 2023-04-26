
interface EstadoProps {
  id: number;
  nombre: string;
  id_proyecto: number;
  color: string;
}

const ColEstado = (
  { estado }: { estado: EstadoProps }
) => {
  return (
    <div className="h-full border-black border">
      {estado.nombre}
    </div>  
  )
}
export default ColEstado