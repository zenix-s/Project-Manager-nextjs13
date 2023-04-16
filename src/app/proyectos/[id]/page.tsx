'use client';

import { useParams } from "next/navigation";
import Header from "../../../components/header/header";

const Page = () => {

  const params = useParams();

  const id = params?.id;

  return (
    <>
    <section className="flex flex-col h-full">
      <Header />
      </section>
    </>
  );
}

export default Page;