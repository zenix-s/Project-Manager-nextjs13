import "@/styles/globals.css";
import AsideBar from "@/components/sidebar/asidebar";
import getCurrentUser from "@/actions/getCurrentUser";
import Header from "@/components/header/header";
import ModalContainer from "@/components/modals/modalcontainer";

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

  if (!user) {
    return (
      <html lang="en">
        <body className="flex h-screen w-screen bg-slate-800">
          <AsideBar user={undefined} />
          <main className="z-40 h-full w-full p-4">
            Incia sesión para ver el contenido
          </main>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className="flex h-screen w-screen overflow-hidden bg-slate-800 ">
        <AsideBar user={user} />
        <main className="z-40 h-full w-full p-4">
          <div className="flex h-full w-full flex-col overflow-hidden">
            <Header />
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
