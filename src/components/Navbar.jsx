import { Link, NavLink } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navbarCollapseRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeNavbar = () => {
    if (navbarCollapseRef.current && navbarCollapseRef.current.classList.contains('show')) {
      navbarCollapseRef.current.classList.remove('show');
      
      const togglerButton = document.querySelector('.navbar-toggler');
      if (togglerButton) {
        togglerButton.setAttribute('aria-expanded', 'false');
      }
    }
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light navbar-custom sticky-top ${
        scrolled ? "scrolled" : ""
      }`}
    >
      <div className="container">
        {/* Aquí puedes mantener el comentario así, fuera del atributo */}
        <Link className="navbar-brand" to="/" onClick={closeNavbar}> 
          Asados Alva-rril
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav" ref={navbarCollapseRef}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
                to="/"
                onClick={closeNavbar} 
              >
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
                to="/menu"
                onClick={closeNavbar}
              >
                Menú
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
                to="/nosotros"
                onClick={closeNavbar}
              >
                Nosotros
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
                to="/ubicacion"
                onClick={closeNavbar}
              >
                Ubicación
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
                to="/contacto"
                onClick={closeNavbar}
              >
                Contacto
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;