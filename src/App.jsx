import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ModelComparator from './components/ModelComparator'
import VehicleCatalog from './components/VehicleCatalog'
import { vehicles } from './data/vehicles'

export default function App() {
  const [selectedVehicleId, setSelectedVehicleId] = useState('dolphin-mini')

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <Header />
      <main id="contenido">
        <Hero />
        <VehicleCatalog vehicles={vehicles} selectedVehicleId={selectedVehicleId} onSelect={setSelectedVehicleId} />
        <ModelComparator vehicles={vehicles} />
      </main>
    </>
  )
}
