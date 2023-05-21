import "@/styles/globals.css";
import AsideBar from "@/components/sidebar/asidebar";
import getCurrentUser from "@/actions/getCurrentUser";
import Header from "@/components/header/header";
import ToasterProvider from "@/providers/ToasterProvider";
import AuthForm from "./authorization/components/authform";
import { useRouter } from "next/navigation";

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

  


  if (!user) {
    return (
      <html lang="en">
        <body className="h-screen w-screen">
          <ToasterProvider />
          <AuthForm />
        </body>
      </html>
    );
  }


  
  return (
    <html lang="en">
      <body className="flex h-screen w-screen overflow-hidden bg-slate-800 ">
        <AsideBar user={user} />
        <ToasterProvider />
        
        {/* <UserProvider user={user} /> */}
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
