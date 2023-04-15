import "../styles/general.css";
import AsideBar from "../components/sidebar/asidebar";
import getCurrentUser from "../actions/getCurrentUser";

export const metadata = {
  title: "Varbas-App",
  description: "Esto es de Sergio Fernández",
};

export default async function RootLayout({ children }) {
  const iduser = await getCurrentUser();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <AsideBar id={iduser ? iduser : undefined} />
        <main>{children}</main>
      </body>
    </html>
  );
}
