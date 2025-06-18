import { useEffect, useRef, useState } from "react"; 
import L from "leaflet";
import "leaflet-routing-machine"; // Importamos el plugin
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// Importar los iconos de Leaflet
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const Ubicacion = () => {
  // Usamos useRef para mantener una referencia al mapa y al control de rutas
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);

  // Coordenadas del restaurante
  const restauranteCoords = [7.8892356, -75.6717612];

  useEffect(() => {
  
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: markerIcon2x,
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
    });

    // Solo inicializamos el mapa si no existe
    if (!mapRef.current) {
      const map = L.map("mi_mapa").setView(restauranteCoords, 17);
      mapRef.current = map; // Guardamos la instancia del mapa

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Marcador original del restaurante
      const marker = L.marker(restauranteCoords)
        .addTo(map)
        .bindPopup("Asados Alva-rril<br>¡Aquí te esperamos!")
        .openPopup();
    }
    
    // Función de limpieza al desmontar el componente
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []); // El array vacío asegura que esto solo se ejecute una vez

  // Función para trazar la ruta
  const trazarRuta = () => {
    // Primero, verificamos si ya existe una ruta para eliminarla antes de crear una nueva
    if (routingControlRef.current) {
      mapRef.current.removeControl(routingControlRef.current);
      routingControlRef.current = null;
    }
    
    if (!navigator.geolocation) {
      alert("Tu navegador no soporta la geolocalización.");
      return;
    }

    // Pedimos la ubicación al usuario
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userCoords = [position.coords.latitude, position.coords.longitude];
        
        // Creamos el control de la ruta
        const routingControl = L.Routing.control({
          waypoints: [
            L.latLng(userCoords),      // Punto de partida: ubicación del usuario
            L.latLng(restauranteCoords) // Punto de destino: el restaurante
          ],
          routeWhileDragging: true,
          language: 'es', // Indicaciones en español
          lineOptions: {
             styles: [{color: '#ffc107', opacity: 0.8, weight: 6}]
          },
          // Personaliza los textos
          geocoder: L.Control.Geocoder.nominatim(),
          createMarker: function(i, waypoint, n) {
            const marker_icon = L.icon({
              iconUrl: markerIcon,
              iconRetinaUrl: markerIcon2x,
              shadowUrl: markerShadow,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            });
            const marker = L.marker(waypoint.latLng, {
              draggable: true,
              icon: marker_icon
            });
            // Mensaje para cada marcador
            const popupText = i === 0 ? "Tu ubicación" : "Asados Alva-rril";
            marker.bindPopup(popupText);
            return marker;
          }
        }).addTo(mapRef.current);

        // Guardamos la referencia al control de la ruta
        routingControlRef.current = routingControl;
      },
      (error) => {
        console.error("Error al obtener la ubicación: ", error);
        alert("No se pudo obtener tu ubicación. Por favor, asegúrate de haber concedido los permisos.");
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

      {/* Botón para activar la funcionalidad */}
      <div className="text-center mb-4">
        <button className="btn btn-warning btn-lg" onClick={trazarRuta}>
          <i className="bi bi-geo-alt-fill me-2"></i>
          Cómo llegar desde mi ubicación
        </button>
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
  );
};

export default Ubicacion;