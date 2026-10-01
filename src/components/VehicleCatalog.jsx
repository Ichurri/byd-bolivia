import { useState } from 'react'
import VehicleCard from './VehicleCard'
import VehicleDialog from './VehicleDialog'

const filters = ['Todos', 'Eléctricos', 'Híbridos', 'Pickup']

export default function VehicleCatalog({ vehicles, selectedVehicleId, onSelect }) {
  const [filter, setFilter] = useState('Todos')
  const [openVehicleId, setOpenVehicleId] = useState(null)
  const visibleVehicles = filter === 'Todos' ? vehicles : vehicles.filter((vehicle) => vehicle.filterGroup === filter)
  const openVehicle = vehicles.find((vehicle) => vehicle.id === openVehicleId)

  return (
    <section className="section-shell catalog-section" id="modelos" aria-labelledby="catalog-title">
      <div className="section-heading">
        <h2 id="catalog-title">Encuentra el BYD que encaja contigo.</h2>
        <p>Siete maneras de moverte con más tecnología, eficiencia y libertad.</p>
      </div>
      <div className="filter-row" aria-label="Filtrar modelos">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            className={filter === item ? 'is-active' : ''}
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="vehicle-grid">
        {visibleVehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            selected={vehicle.id === selectedVehicleId}
            onDetails={setOpenVehicleId}
            onSelect={onSelect}
          />
        ))}
      </div>
      <VehicleDialog vehicle={openVehicle} onClose={() => setOpenVehicleId(null)} onSelect={onSelect} />
    </section>
  )
}
