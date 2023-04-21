"use client";

import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();

  const id = params?.id;

  return (
    <>
      <section className="flex h-full flex-col">
        Proyecto
      </section>
    </>
  );
};

export default Page;
