import '../styles/general.css'
import SideMenu from "./components/asidemenu"


export const metadata = {
  title: 'Varbas-App',
  description: 'Esto es de Sergio Fernández',
}
 
export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
      </head>
      <body>
        <SideMenu />
        {children}
      </body>
    </html>
  )
}
