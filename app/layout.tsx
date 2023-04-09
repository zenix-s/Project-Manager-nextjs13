import '../styles/general.css'
import AsideBar from '../components/sidebar/asidebar'



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
      </head>
      <body>
        <AsideBar />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}