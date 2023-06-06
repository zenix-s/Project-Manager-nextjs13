import getCurrentUser from "@/actions/getCurrentUser";

const perfilPage = async () => {
  const user = await getCurrentUser();
  return (
    <section className="h-ful w-full ">
      <h1>{user?.name}</h1>
      <h2>{user?.email}</h2>
    </section>
  );
};

export default perfilPage;
