import React, { useEffect } from "react";
import L from "leaflet"; // Importas Leaflet

const Ubicacion = () => {
  useEffect(() => {
    const map = L.map("mi_mapa").setView([7.8892356, -75.6717612], 17);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([7.8892356, -75.6717612])
      .addTo(map)
      .bindPopup(
        "Asados Alva-rril<br>Calle 11 con Carrera 9<br>Puerto Libertador, Córdoba"
      )
      .openPopup();

    map.on("click", function (e) {
      alert("Posición: " + e.latlng);
    });

    // Limpieza al desmontar el componente
    return () => {
      map.remove();
    };
  }, []);

  return (
    <section className="container my-5">
      <h2 className="text-center mb-4" id="title">
        Nuestra Ubicación
      </h2>
      <div className="bg-light rounded shadow-sm mb-4">
        <div id="mi_mapa" style={{ height: "400px", width: "100%" }}></div>
      </div>
      <div className="row text-center">
        <div className="col-md-6 mb-3">
          <h5>Dirección</h5>
          <p>
            <i className="bi bi-geo-alt-fill text-warning"></i> Calle #11, 
            Carrera 9, Puerto Libertador, Córdoba
          </p>
        </div>
        <div className="col-md-6 mb-3">
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
