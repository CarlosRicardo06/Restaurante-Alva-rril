import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const Ubicacion = () => {
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);
  const restauranteCoords = [7.8892356, -75.6717612];

  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: markerIcon2x,
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
    });

    if (!mapRef.current) {
      const map = L.map("mi_mapa").setView(restauranteCoords, 17);
      mapRef.current = map;

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(restauranteCoords)
        .addTo(map)
        .bindPopup("Asados Alva-rril<br> Calle #11, Carrera 9, Puerto Libertador, Córdoba")
        .openPopup();
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const trazarRuta = () => {
    // 1. Mensaje para saber que el clic funcionó
    console.log("Botón presionado, iniciando trazado de ruta...");

    if (routingControlRef.current) {
      console.log("Eliminando ruta anterior.");
      mapRef.current.removeControl(routingControlRef.current);
      routingControlRef.current = null;
    }

    if (!navigator.geolocation) {
      console.error("Error: El navegador no soporta la geolocalización.");
      alert("Tu navegador no soporta la geolocalización.");
      return;
    }

    // 2. Mensaje antes de pedir la ubicación
    console.log("Obteniendo ubicación del usuario...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userCoords = [
          position.coords.latitude,
          position.coords.longitude,
        ];
        // 3. Mensaje si la ubicación se obtiene con éxito
        console.log("Ubicación obtenida:", userCoords);

        // 4. Mensaje antes de crear la ruta
        console.log("Creando el control de la ruta...");

        const routingControl = L.Routing.control({
          waypoints: [L.latLng(userCoords), L.latLng(restauranteCoords)],
          routeWhileDragging: true,
          language: "es",
          lineOptions: {
            styles: [{ color: "#ffc107", opacity: 0.8, weight: 6 }],
          },
        }).addTo(mapRef.current);

        console.log("Control de ruta añadido al mapa.");
        routingControlRef.current = routingControl;
      },
      (error) => {
        // 5. Mensaje si hay un error al obtener la ubicación
        console.error("Error al obtener la ubicación: ", error);
        let errorMessage = "No se pudo obtener tu ubicación.";
        if (error.code === 1) {
          errorMessage =
            "Permiso denegado. Por favor, habilita el permiso de ubicación para trazar la ruta.";
        } else if (error.code === 2) {
          errorMessage = "La ubicación no está disponible en este momento.";
        } else if (error.code === 3) {
          errorMessage =
            "Se ha agotado el tiempo de espera para obtener la ubicación.";
        }
        alert(errorMessage);
      }
    );
  };

  return (
    <section className="container my-5">
      <h2 className="text-center mb-4" id="title" data-aos="fade-down">
        Nuestra Ubicación
      </h2>
      <div className="bg-light rounded shadow-sm mb-4" data-aos="zoom-in">
        <div id="mi_mapa" style={{ height: "450px", width: "100%" }}></div>
      </div>

      <div className="text-center mb-4">
        <button className="btn btn-warning btn-lg" onClick={trazarRuta}>
          <i className="bi bi-geo-alt-fill me-2"></i>
          Cómo llegar desde mi ubicación
        </button>
      </div>

      <div className="row text-center">
        <div
          className="col-md-6 mb-3"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          <h5>Dirección</h5>
          <p>
            <i className="bi bi-geo-alt-fill text-warning"></i> Calle #11,
            Carrera 9, Puerto Libertador, Córdoba
          </p>
        </div>
        <div
          className="col-md-6 mb-3"
          data-aos="fade-left"
          data-aos-delay="300"
        >
          <h5>Cómo Llegar</h5>
          <p>
            <i className="bi bi-car-front-fill text-warning"></i>{" "}
            <strong>En Carro</strong>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Ubicacion;
