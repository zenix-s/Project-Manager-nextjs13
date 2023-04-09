import Header from "../components/header"
import getCurrentUser from "../actions/getCurrentUser";
 


export default async function Page() {
  const id = await getCurrentUser();


  return (
    <section>
      <Header
        ruta={[
          {
            name: "Dashboard",
            path: "/",
            actual : true
          }
        ]}
      />
      <h1>Page</h1>
      <p>Main</p>
      { id ? <p>Logged id {id}</p> : <></>}
    </section>
  )
}