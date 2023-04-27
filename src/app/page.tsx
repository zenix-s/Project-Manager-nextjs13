import Header from "../components/header/header";
import getCurrentUser from "@/actions/getCurrentUser";

const Page = async () => {
  const user = await getCurrentUser();
  const id = user ? user.id : null;

  return (
    <section className="w-full h-full">
      <div className="w-full h-full flex items-center justify-center text-[15vw] font-extrabold">
        <h1>VARBAS</h1>
      </div>
      {id ? <p>Logged id {id}</p> : <></>}
    </section>
  );
};

export default Page;
