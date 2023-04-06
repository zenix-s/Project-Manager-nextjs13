import Header from "../../components/header";
export default function Page() {
  return (
    <>
      <Header
        ruta={[
          {
            name: "About",
            path: "/about",
            actual: true,
          },
        ]}
      />
      <section>
        <h1>About</h1>
        <p>Essta es la pagina del about</p>
      </section>
    </>
  );
}
