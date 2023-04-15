import Header from "../components/header"
import getCurrentUser from "../actions/getCurrentUser";
 


const Page = async () => {
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

export default Page