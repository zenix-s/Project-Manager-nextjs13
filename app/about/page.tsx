'use client'
import Header from "../../components/header";
export default function Page() {
  return (
    <>
      <Header
        ruta={[
          {
            name: "Dashboard",
            path: "/",
            actual: false,
          },
          {
            name: "About",
            path: "/about",
            actual: true,
          },
        ]}
      />
      <section>
        <h1
          className="
            text-red-300
            text-4xl
            font-bold
            text-center
          "
        >About</h1>
        <p>Essta es la pagina del about</p>
      </section>
    </>
  );
}
