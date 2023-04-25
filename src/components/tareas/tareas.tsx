import CardTarea from "./cardTarea";
const Tareas = ({ tareas }: any) => {
  console.log(tareas);

  return (
    <div>
      <div>
        {/* map tareas where item id_estado == 1 */}
        {tareas.map((item: any) => {
          // if (item.id_estado === 1) {
          //   return (
          //     <div key={item.id}>
          //       <div>
          //         <p>{item.nombre}</p>
          //       </div>
          //       <div>
          //         <p>{item.descripcion}</p>
          //       </div>
          //       <div>
          //         <p>{item.id_estado}</p>
          //       </div>
          //     </div>
          //   );
          // }
          return (
            <CardTarea
              key={item.id}
              tarea={item}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Tareas;
