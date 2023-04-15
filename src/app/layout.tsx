import "@/styles/globals.css";
import AsideBar from "@/components/sidebar/asidebar";
import getCurrentUser from "@/actions/getCurrentUser";

export const metadata = {
  title: "Varbas",
  description: "Sergio Fernandez",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const iduser = await getCurrentUser();
  return (
    <html lang="en">
      <body>
        <AsideBar id={iduser ? iduser : undefined} />
        <main>{children}</main>
      </body>
    </html>
  );
}
