import { Routes, Route, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Inicio from "./pages/inicio"
import Menu from "./pages/menu"
import Nosotros from "./pages/Nosotros"
import Ubicacion from "./pages/Ubicacion"
import Contacto from "./pages/Contacto"

function App() {
  const location = useLocation()
  const isHomePage = location.pathname === "/"

  return (
    <>
      <Navbar />

      {isHomePage ? (
        // Para la página de inicio, no usar container
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Inicio />} />
          </Routes>
        </main>
      ) : (
        // Para las demás páginas, usar container normal
        <main className="container my-4 flex-grow-1">
          <Routes>
            <Route path="/menu" element={<Menu />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/ubicacion" element={<Ubicacion />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </main>
      )}

      <Footer />
    </>
  )
}

export default App
