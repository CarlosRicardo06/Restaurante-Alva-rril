import { useEffect } from "react"
import L from "leaflet"

// Importar los iconos de Leaflet
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

const Ubicacion = () => {
  useEffect(() => {
    // Configurar los iconos de Leaflet
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: markerIcon2x,
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
    })

    const map = L.map("mi_mapa").setView([7.8892356, -75.6717612], 17)

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    const marker = L.marker([7.8892356, -75.6717612])
      .addTo(map)
      .bindPopup("Asados Alva-rril<br>Calle 11 con Carrera 9<br>Puerto Libertador, Córdoba")
      .openPopup()

    // Añadir animación al marcador
    const animateMarker = () => {
      const markerElement = marker.getElement()
      if (markerElement) {
        markerElement.style.transition = "transform 0.5s ease"
        markerElement.style.transform = "translateY(-10px)"

        setTimeout(() => {
          markerElement.style.transform = "translateY(0)"
        }, 500)
      }
    }

    // Animar el marcador cada 3 segundos
    const animationInterval = setInterval(animateMarker, 3000)

    // Limpieza al desmontar el componente
    return () => {
      map.remove()
      clearInterval(animationInterval)
    }
  }, [])

  return (
    <section className="container my-5">
      <h2 className="text-center mb-4" id="title" data-aos="fade-down">
        Nuestra Ubicación
      </h2>
      <div className="bg-light rounded shadow-sm mb-4" data-aos="zoom-in">
        <div id="mi_mapa" style={{ height: "400px", width: "100%" }}></div>
      </div>
      <div className="row text-center">
        <div className="col-md-6 mb-3" data-aos="fade-right" data-aos-delay="100">
          <h5>Dirección</h5>
          <p>
            <i className="bi bi-geo-alt-fill text-warning"></i> Calle #11, Carrera 9, Puerto Libertador, Córdoba
          </p>
        </div>
        <div className="col-md-6 mb-3" data-aos="fade-left" data-aos-delay="300">
          <h5>Cómo Llegar</h5>
          <p>
            <i className="bi bi-car-front-fill text-warning"></i> <strong>En Carro</strong>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Ubicacion
