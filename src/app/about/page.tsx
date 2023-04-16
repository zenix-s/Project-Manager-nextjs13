"use client";
import Header from "@/components/header/header";
const Page = () => {
  return (
    <>
      <Header />
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
