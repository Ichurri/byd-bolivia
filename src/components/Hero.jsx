import { ArrowDown, Lightning } from '@phosphor-icons/react'
import { assetUrl } from '../lib/assets'

export default function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-copy">
        <p className="eyebrow"><Lightning size={15} weight="fill" /> Nueva energía · Bolivia</p>
        <h1 id="hero-title">Movilidad que cambia el horizonte.</h1>
        <p className="hero-lede">Explora tecnología eléctrica, compara modelos y estima tu próxima cuota en minutos.</p>
        <div className="hero-actions">
          <a className="button" href="#modelos">Ver modelos</a>
          <a className="button button-ghost" href="#financiamiento">Simular cuota</a>
        </div>
      </div>
      <div className="hero-visual">
        <img src={assetUrl('vehicles/atto-8.webp')} alt="BYD Atto 8 en un entorno futurista iluminado" />
        <div className="hero-spec">
          <span>ATTO 8</span>
          <strong>3 filas</strong>
          <small>SUV súper híbrido</small>
        </div>
      </div>
      <a className="scroll-cue" href="#modelos" aria-label="Ir al catálogo">
        <ArrowDown size={18} />
      </a>
    </section>
  )
}
