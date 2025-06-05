const Nosotros = () => (
  <section className="container py-5">
    <h2 className="text-center mb-5 fw-bold" id="title" data-aos="fade-down">
      Sobre Nosotros
    </h2>
    <div className="row mb-5 align-items-center">
      <div className="col-md-6" data-aos="fade-right" data-aos-delay="100">
        <h4 className="text-warning fw-bold">Nuestra Historia</h4>
        <p>
          Asados Alva-rril nació en 2023 de la pasión de Álvaro, nuestro
          fundador, por la cocina tradicional y los asados...
        </p>
        <p>
          El nombre "Alva-rril" surge como un juego de palabras entre el nombre
          de nuestro fundador y la técnica de cocción en barril.
        </p>
        <p>
          Desde nuestros inicios, nos hemos comprometido a ofrecer la mejor
          experiencia gastronómica con ingredientes frescos y locales.
        </p>
      </div>
      <div className="col-md-6" data-aos="fade-left" data-aos-delay="300">
        <div className="bg-light rounded shadow-sm text-center p-3 img-hover-zoom">
          <img
            src="/img/img4.jpg"
            alt="Imagen del asadero"
            className="img-fluid rounded"
            style={{ maxHeight: "300px", objectFit: "cover" }}
          />
        </div>
      </div>
    </div>

    <div className="row text-center">
      <div className="col-md-6 mb-4" data-aos="zoom-in" data-aos-delay="100">
        <div className="p-4 bg-light rounded-3 h-100 shadow-sm">
          <h5 className="text-warning fw-bold">Nuestra Misión</h5>
          <p>
            Ofrecer la mejor experiencia de asados en Puerto Libertador (Bijao),
            a través de productos de calidad, un servicio excepcional y un
            ambiente acogedor que haga sentir a nuestros clientes como en casa.
          </p>
        </div>
      </div>
      <div className="col-md-6 mb-4" data-aos="zoom-in" data-aos-delay="300">
        <div className="p-4 bg-light rounded-3 h-100 shadow-sm">
          <h5 className="text-warning fw-bold">Nuestra Visión</h5>
          <p>
            Convertirnos en el referente gastronómico de asados en la región,
            expandiendo nuestra presencia y manteniendo siempre la calidad y el
            sabor que nos caracteriza.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Nosotros;
