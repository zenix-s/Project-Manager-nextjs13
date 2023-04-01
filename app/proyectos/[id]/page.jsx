export default function Page({params}) {
  const { id } = params;
  return (
    <div>
      <h1>Proyecto {id}</h1>
    </div>
  )
}