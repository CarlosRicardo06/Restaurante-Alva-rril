import { useState } from "react";

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    fecha: "",
    mensaje: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Enviar datos a Formspree
      const response = await fetch("https://formspree.io/f/xwpbpowo", {
        
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          telefono: formData.telefono,
          fecha_reserva: formData.fecha || "No especificada",
          mensaje: formData.mensaje,
        }),
      });

      if (response.ok) {
        console.log("Formulario enviado exitosamente a tu correo!");
        setFormSubmitted(true);

        // Resetear el formulario después de 3 segundos
        setTimeout(() => {
          setFormSubmitted(false);
          setFormData({
            nombre: "",
            email: "",
            telefono: "",
            fecha: "",
            mensaje: "",
          });
        }, 3000);
      } else {
        throw new Error("Error en el envío del formulario");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(
        "Hubo un problema al enviar tu mensaje. Por favor, intenta de nuevo."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const whatsappNumber = "573122111098"; // El número sin el '+'
  const whatsappMessage = encodeURIComponent("¡Hola! Me gustaría hacer una consulta."); // Mensaje predeterminado, codificado para URL


  return (
    <section className="container my-5">
      <h2 className="text-center mb-4" id="title" data-aos="fade-down">
        Contacto
      </h2>
      <div className="row">
        <div className="col-md-6" data-aos="fade-right" data-aos-delay="100">
          <h5>Envíanos un mensaje</h5>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {formSubmitted ? (
            <div
              className="alert alert-success"
              role="alert"
              data-aos="zoom-in"
            >
              ¡Gracias por tu mensaje! Te contactaremos pronto.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nombre completo</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tu nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="tucorreo@ejemplo.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Teléfono</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Tu número de teléfono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Fecha de reserva (opcional)
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Mensaje</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Escribe tu mensaje aquí..."
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-warning w-100"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Enviando...
                  </>
                ) : (
                  "Enviar mensaje"
                )}
              </button>
            </form>
          )}
        </div>
        <div
          className="col-md-6 mt-5 mt-md-0"
          data-aos="fade-left"
          data-aos-delay="300"
        >
          <h5>Información de contacto</h5>
          <div className="p-4 bg-light rounded shadow-sm">
            <p>
              <i className="bi bi-geo-alt-fill text-warning"></i>{" "}
              <strong>Dirección:</strong> Calle #11, Carrera 9, Puerto
          Libertador, Córdoba
            </p>
            <p>
              <i className="bi bi-telephone-fill text-warning"></i>{" "}
              <strong>Teléfono:</strong> +57 123 456 7890
            </p>
            <p>
              <i className="bi bi-envelope-fill text-warning"></i>{" "}
              <strong>Correo electrónico:</strong>{" "}
              carlos.ricardoreiino@gmail.com
            </p>
            <p>
              <i className="bi bi-clock-fill text-warning"></i>{" "}
              <strong>Horarios:</strong>
              <br />
              Lunes a Jueves: 12:00 PM - 9:00 PM
              <br />
              Viernes y Sábado: 12:00 PM - 10:00 PM
              <br />
              Domingo: 12:00 PM - 8:00 PM
            </p>
          </div>
          <div className="mt-4" data-aos="zoom-in" data-aos-delay="500">
            <h5>Síguenos en redes sociales</h5>
            <div className="d-flex justify-content-center gap-3 mt-3">
              <a href="#" className="text-decoration-none">
                <i className="bi bi-facebook fs-2 text-warning"></i>
              </a>
              <a href="#" className="text-decoration-none">
                <i className="bi bi-instagram fs-2 text-warning"></i>
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                className="text-decoration-none"
                target="_blank" // Abre el enlace en una nueva pestaña
                rel="noopener noreferrer" // Mejora la seguridad al abrir en nueva pestaña
              >
                <i className="bi bi-whatsapp fs-2 text-warning"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
