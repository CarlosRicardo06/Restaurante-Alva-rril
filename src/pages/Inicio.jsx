import { useEffect } from "react"
import { Link } from "react-router-dom"

const Inicio = () => {
  useEffect(() => {
    const titleElement = document.querySelector(".hero-section h1")
    const leadElement = document.querySelector(".hero-section p.lead")
    const btnElement = document.querySelector(".hero-section .btn")

    setTimeout(() => {
      titleElement.classList.add("visible")
    }, 300)

    setTimeout(() => {
      leadElement.classList.add("visible")
    }, 800)

    setTimeout(() => {
      btnElement.classList.add("visible")
    }, 1300)

    return () => {
      if (titleElement) titleElement.classList.remove("visible")
      if (leadElement) leadElement.classList.remove("visible")
      if (btnElement) btnElement.classList.remove("visible")
    }
  }, [])

  return (
    <section id="inicio" className="hero-section text-center text-white">
      <div className="container">
        <h1 className="display-1 fw-bold mb-4 fade-in">Asados Alva-rril</h1>
        <p className="lead fs-3 mb-5 fw-bold fade-in">La mejor experiencia de asados en Puerto Libertador (Bijao), Córdoba</p>
        <Link to="/menu" className="btn fade-in btn-pulse">
          Ver Menú
        </Link>
      </div>
    </section>
  )
}

export default Inicio
