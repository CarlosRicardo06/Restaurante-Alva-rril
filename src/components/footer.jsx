function Footer() {
  return (
    <div className="footer-bar text-center mt-auto">
      <div className="container d-flex flex-column flex-md-row justify-content-around align-items-center text-white py-1">
        <div data-aos="fade-up" data-aos-delay="100">
          <i className="bi bi-geo-alt-fill"></i> Calle #11, Carrera 9, Puerto
          Libertador, Córdoba
        </div>
        <div data-aos="fade-up" data-aos-delay="s">
          <i className="bi bi-clock-fill"></i> Abierto: 12:00 PM - 10:00 PM
        </div>
        <div data-aos="fade-up" data-aos-delay="300">
          <i className="bi bi-telephone-fill"></i> +57 312 211 1098
        </div>
      </div>
      <div className="text-white py-1">
        <div className="container">
          <small>
            &copy; {new Date().getFullYear()} Asados Alva-rril. Todos los
            derechos reservados.
          </small>
        </div>
      </div>
    </div>
  );
}

export default Footer;
