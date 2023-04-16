'use client';

import { useParams } from "next/navigation";
import Header from "../../../components/header/header";

const Page = () => {

  const params = useParams();

  const id = params?.id;

  return (
    <>
    <section className="flex flex-col h-full">
      <Header
        ruta={[
          {
            path: "/",
            name: "Dashboard",
            actual: false,
          },
          {
            path: "/proyectos",
            name: "Proyectos",
            actual: false,
          },
          {
            path: `/proyectos/${id}`,
            name: id,
            actual: true,
          },
        ]}
      />
      </section>
    </>
  );
}

export default Page;