import { useEffect } from "react";

const productos = [
  {
    titulo: "Costilla BBQ",
    descripcion:
      "Costilla de cerdo bañada en salsa BBQ, servida con papas crocantes y ensalada fresca.",
    precio: 20000,
    imagen: import.meta.env.BASE_URL + "img/img1.jpg", // Usa BASE_URL
  },
  {
    titulo: "Chicharrón",
    descripcion:
      "Crujiente chicharrón tradicional con yuca y salsa de la casa.",
    precio: 22000,
    imagen: import.meta.env.BASE_URL + "img/img3.jpg", // Usa BASE_URL
  },
  {
    titulo: "Bondiola",
    descripcion:
      "Jugosa bondiola de cerdo con papas a la francesa y salsa chimichurri.",
    precio: 15000,
    imagen: import.meta.env.BASE_URL + "img/img6.jpg", // Usa BASE_URL
  },
  {
    titulo: "Picada Mixta",
    descripcion:
      "Combinación de bondiola, chicharrón, chorizo, papas a la francesa y salsa de la casa",
    precio: 25000,
    imagen: import.meta.env.BASE_URL + "img/img8.jpg", // Usa BASE_URL
  },
];

const Menu = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll(".fade-in");
    cards.forEach((card) => {
      observer.observe(card);
    });

    return () => {
      cards.forEach((card) => {
        observer.unobserve(card);
      });
    };
  }, []);

  return (
    <section className="container my-5">
      <h2 className="mb-4" style={{ color: "#cc6a00" }} data-aos="fade-down">
        Nuestro menú
      </h2>
      <div className="row">
        {productos.map((producto, index) => (
          <div
            className="col-lg-6 mb-4"
            key={index}
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
            data-aos-delay={index * 100}
          >
            <div className="card h-100 fade-in">
              <div className="row g-0">
                <div className="col-md-5 img-hover-zoom">
                  <img
                    src={producto.imagen || "/placeholder.svg"}
                    className="img-fluid h-100 w-100"
                    style={{ objectFit: "cover" }}
                    alt={producto.titulo}
                  />
                </div>
                <div className="col-md-7">
                  <div className="card-body d-flex flex-column h-100">
                    <h5 className="card-title">{producto.titulo}</h5>
                    <p className="card-text">{producto.descripcion}</p>
                    <p className="fw-bold text-warning mt-auto">
                      ${producto.precio.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;
