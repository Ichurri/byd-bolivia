import { ArrowUpRight, Buildings, ChargingStation, Package, ShieldCheck, Wrench } from '@phosphor-icons/react'

const services = [
  { icon: Package, title: 'Accesorios', copy: 'Equipa tu BYD para tu forma de moverte.' },
  { icon: Wrench, title: 'Mantenimiento', copy: 'Consulta planes y atención especializada.' },
  { icon: ChargingStation, title: 'Cargadores', copy: 'Explora soluciones para hogar y empresa.' },
]

export default function CommercialSections() {
  return (
    <>
      <section className="fleet-section" id="empresas" aria-labelledby="fleet-title">
        <div className="section-shell fleet-layout">
          <div className="fleet-main">
            <Buildings size={34} />
            <h2 id="fleet-title">Una flota que mueve tu negocio hacia adelante.</h2>
            <p>Soluciones para empresas que buscan eficiencia operativa, tecnología y una movilidad con menor impacto.</p>
            <a className="button button-light" href="#contacto">Cotizar flota <ArrowUpRight size={17} /></a>
          </div>
          <div className="fleet-aside">
            <div><strong>01</strong><h3>Cotización corporativa</h3><p>Configura una selección de vehículos según el tamaño y operación de tu empresa.</p></div>
            <div><strong>02</strong><h3>Acompañamiento comercial</h3><p>Centraliza consultas de unidades, equipamiento y condiciones disponibles.</p></div>
            <div><strong>03</strong><h3>Electrificación gradual</h3><p>Combina eléctricos e híbridos enchufables según rutas y necesidades reales.</p></div>
          </div>
        </div>
      </section>

      <section className="services-section" aria-labelledby="services-title">
        <div className="section-shell">
          <div className="section-heading"><h2 id="services-title">Más allá del vehículo.</h2></div>
          <div className="services-strip">
            {services.map(({ icon: Icon, title, copy }) => (
              <div key={title} className="service-item"><Icon size={24} /><div><h3>{title}</h3><p>{copy}</p></div></div>
            ))}
          </div>
          <div className="business-model">
            <div>
              <ShieldCheck size={26} />
              <h3>Ingresos directos para BYD</h3>
              <p>El showroom genera oportunidades para ventas de vehículos, flotas y servicios complementarios ofrecidos por BYD.</p>
            </div>
            <div>
              <span className="agreement-mark">Acuerdo requerido</span>
              <h3>Convenios financieros</h3>
              <p>Las comisiones por operaciones referidas solo serían posibles con entidades participantes, autorización y cumplimiento legal.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
