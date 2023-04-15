"use client";
import Header from "@/components/header";
const Page = () => {
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
            text-center
            text-4xl
            font-bold
            text-red-300
          "
        >
          About
        </h1>
        <p>Essta es la pagina del about</p>
      </section>
    </>
  );
};

export default Page;
