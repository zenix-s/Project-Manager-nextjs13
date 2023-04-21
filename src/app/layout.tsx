import "@/styles/globals.css";
import AsideBar from "@/components/sidebar/asidebar";
import getCurrentUser from "@/actions/getCurrentUser";
import Header from "@/components/header/header";

export const metadata = {
  title: "Varbas",
  description: "Sergio Fernandez",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const iduser = user ? user.id : null;
  return (
    <html lang="en">
      <body className="flex h-screen w-screen bg-neutral-100">
        <aside className="hidden z-50 h-screen w-screen lg:relative  lg:flex lg:w-1/2 lg:min-w-[330px] lg:max-w-[400px] xl:w-1/4">
          <AsideBar id={iduser ? iduser : undefined} />
        </aside>
        <main className="z-40 h-full w-full p-4">
          <div className="h-full w-full overflow-hidden flex flex-col">
            <Header />
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
