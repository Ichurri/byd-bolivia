import { useState } from 'react'
import { Check, Plus, X } from '@phosphor-icons/react'
import { priceStatusLabels } from '../data/vehicles'

const formatUsd = new Intl.NumberFormat('es-BO', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

export default function ModelComparator({ vehicles }) {
  const [selectedIds, setSelectedIds] = useState(['dolphin-mini', 'yuan-pro'])
  const [message, setMessage] = useState('')
  const selected = selectedIds.map((id) => vehicles.find((vehicle) => vehicle.id === id)).filter(Boolean)

  const toggleVehicle = (vehicleId) => {
    if (selectedIds.includes(vehicleId)) {
      setSelectedIds((ids) => ids.filter((id) => id !== vehicleId))
      setMessage('')
      return
    }
    if (selectedIds.length >= 3) {
      setMessage('Puedes comparar hasta 3 modelos.')
      return
    }
    setSelectedIds((ids) => [...ids, vehicleId])
    setMessage('')
  }

  const rows = [
    ['Precio', (vehicle) => formatUsd.format(vehicle.price)],
    ['Estado', (vehicle) => priceStatusLabels[vehicle.priceStatus]],
    ['Autonomía', (vehicle) => `${vehicle.rangeKm} km · ${vehicle.rangeStandard}`],
    ['Dimensiones', (vehicle) => `${vehicle.lengthMm} × ${vehicle.widthMm} × ${vehicle.heightMm} mm`],
    ['Motorización', (vehicle) => vehicle.powertrain],
    ['Potencia', (vehicle) => `${vehicle.powerHp} hp`],
    ['Equipamiento', (vehicle) => vehicle.features.join(' · ')],
  ]

  return (
    <section className="comparison-section" id="comparar" aria-labelledby="comparison-title">
      <div className="section-shell">
        <div className="comparison-header">
          <div className="section-heading">
            <h2 id="comparison-title">Compara lo que realmente importa.</h2>
            <p>Elige entre dos y tres modelos para ver sus diferencias en una sola mirada.</p>
          </div>
          <div className="selection-count"><strong>{selectedIds.length}</strong><span>de 3 modelos</span></div>
        </div>

        <div className="model-picker" aria-label="Seleccionar modelos para comparar">
          {vehicles.map((vehicle) => {
            const checked = selectedIds.includes(vehicle.id)
            return (
              <label key={vehicle.id} className={checked ? 'is-selected' : ''}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleVehicle(vehicle.id)}
                  aria-label={`Comparar ${vehicle.name}`}
                />
                <span className="picker-icon">{checked ? <Check size={14} weight="bold" /> : <Plus size={14} />}</span>
                <span>{vehicle.name.replace('BYD ', '')}</span>
              </label>
            )
          })}
        </div>
        <p className={`comparison-status ${message ? 'has-message' : ''}`} role="status">{message}</p>

        {selected.length >= 2 ? (
          <div className="comparison-scroll" tabIndex="0" aria-label="Tabla comparativa desplazable">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th scope="col">Especificación</th>
                  {selected.map((vehicle) => (
                    <th scope="col" key={vehicle.id}>
                      <img src={vehicle.image} alt="" />
                      <span>{vehicle.name}</span>
                      <button type="button" onClick={() => toggleVehicle(vehicle.id)} aria-label={`Quitar ${vehicle.name}`}>
                        <X size={14} />
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(([label, value]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    {selected.map((vehicle) => <td key={vehicle.id}>{value(vehicle)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="comparison-empty">Selecciona al menos dos modelos para comenzar.</div>
        )}
      </div>
    </section>
  )
}
