import getCurrentUser from "@/actions/getCurrentUser";
import ProfileSection from "./components/ProfileSection";

const perfilPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return <div>loading...</div>;
  }

  return (
    <section className="h-ful w-full ">
      <ProfileSection user={user} />
    </section>
  );
};

export default perfilPage;
