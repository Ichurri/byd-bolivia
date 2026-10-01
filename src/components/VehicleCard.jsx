import { ArrowUpRight, BatteryCharging, Gauge } from '@phosphor-icons/react'
import { priceStatusLabels } from '../data/vehicles'

export default function VehicleCard({ vehicle, selected, onDetails, onSelect }) {
  return (
    <article className={`vehicle-card ${selected ? 'is-selected' : ''}`} style={{ '--vehicle-accent': vehicle.accent }}>
      <div className="vehicle-image">
        <img
          src={vehicle.image}
          alt={vehicle.imageAlt}
          loading="lazy"
          onError={(event) => { event.currentTarget.hidden = true }}
        />
        <span className="vehicle-type">{vehicle.powertrain}</span>
      </div>
      <div className="vehicle-card-body">
        <div className="vehicle-title-row">
          <div>
            <p>{vehicle.category}</p>
            <h3>{vehicle.name}</h3>
          </div>
          <span className="vehicle-trim">{vehicle.trim}</span>
        </div>
        <div className="vehicle-metrics">
          <span><BatteryCharging size={18} /> <strong>{vehicle.rangeKm} km</strong> autonomía</span>
          <span><Gauge size={18} /> <strong>{vehicle.powerHp} hp</strong> potencia</span>
        </div>
        <div className="vehicle-price">
          <strong>{vehicle.priceLabel}</strong>
          <small>{priceStatusLabels[vehicle.priceStatus]}</small>
        </div>
        <div className="vehicle-actions">
          <button className="text-button" type="button" onClick={() => onDetails(vehicle.id)}>
            Detalles de {vehicle.name} <ArrowUpRight size={16} />
          </button>
          <button
            className="select-dot"
            type="button"
            aria-label={`Seleccionar ${vehicle.name} para el simulador`}
            aria-pressed={selected}
            onClick={() => onSelect(vehicle.id)}
          >
            <span />
          </button>
        </div>
      </div>
    </article>
  )
}
