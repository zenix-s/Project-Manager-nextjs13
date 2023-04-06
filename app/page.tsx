import Header from "../components/header"
interface Props {
  ruta: {
    name: string
    path: string
    actual?: boolean
  }[]
}
export default function Page() {
  return (
    <section>
      <Header
        ruta={[
          {
            name: "",
            path: "/",
            actual : true
          }
        ]}
      />
      <h1>Page</h1>
      <p>Main</p>
    </section>
  )
}