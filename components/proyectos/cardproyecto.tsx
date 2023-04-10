'use client';

interface CardProyectoProps{
  name: String;
  description: String;
  endDate?: String;
}

const CardProyecto = ({ name, description, endDate }: CardProyectoProps) => {
  return (
    <a className="
      w-full
      max-w-md
      h-52
      bg-white
      shadow-md
      rounded-xl
      p-4
      m-2
    " href="#">
      <div className="">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
      <div className="">
        <p>Fecha de finalización: {endDate}</p>
      </div>
    </a>
  );
};


export default CardProyecto;