import { Check, X } from '@phosphor-icons/react'
import { priceStatusLabels } from '../data/vehicles'

export default function VehicleDialog({ vehicle, onClose, onSelect }) {
  if (!vehicle) return null

  return (
    <div className="dialog-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="vehicle-dialog" role="dialog" aria-modal="true" aria-labelledby={`dialog-${vehicle.id}`}>
        <button className="icon-button dialog-close" type="button" onClick={onClose} aria-label="Cerrar detalles">
          <X size={22} />
        </button>
        <div className="dialog-image"><img src={vehicle.image} alt="" /></div>
        <div className="dialog-content">
          <p className="dialog-kicker">{vehicle.category} · {vehicle.trim}</p>
          <h2 id={`dialog-${vehicle.id}`}>{vehicle.name}</h2>
          <p className="dialog-powertrain">{vehicle.powertrain}</p>
          <div className="dialog-stats">
            <div><strong>{vehicle.rangeKm} km</strong><span>{vehicle.rangeStandard}</span></div>
            <div><strong>{vehicle.powerHp} hp</strong><span>Potencia referencial</span></div>
            <div><strong>{vehicle.lengthMm / 1000} m</strong><span>Largo</span></div>
          </div>
          <ul className="feature-list">
            {vehicle.features.map((feature) => <li key={feature}><Check size={17} /> {feature}</li>)}
          </ul>
          <div className="dialog-footer">
            <div><strong>{vehicle.priceLabel}</strong><small>{priceStatusLabels[vehicle.priceStatus]}</small></div>
            <button className="button" type="button" onClick={() => { onSelect(vehicle.id); onClose() }}>Usar en simulador</button>
          </div>
        </div>
      </div>
    </div>
  )
}
