import React from "react"
import ReactDOM from "react-dom/client"
import { HashRouter } from "react-router-dom"
import App from "./App"
import "./index.css"
import "leaflet/dist/leaflet.css"
// import AOS from "aos"
// import "aos/dist/aos.css"

// Inicializar AOS
// AOS.init({
//   duration: 800,
//   easing: "ease-in-out",
//   once: false,
//   mirror: false,
// })

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
