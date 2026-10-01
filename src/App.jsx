import { useState } from 'react'
import FinanceCalculator from './components/FinanceCalculator'
import Header from './components/Header'
import Hero from './components/Hero'
import LeadForms from './components/LeadForms'
import ModelComparator from './components/ModelComparator'
import VehicleCatalog from './components/VehicleCatalog'
import { vehicles } from './data/vehicles'
import { saveLead } from './lib/storage'

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
        <FinanceCalculator vehicles={vehicles} selectedVehicleId={selectedVehicleId} onVehicleChange={setSelectedVehicleId} />
        <LeadForms vehicles={vehicles} selectedVehicleId={selectedVehicleId} onVehicleChange={setSelectedVehicleId} saveLead={saveLead} />
      </main>
    </>
  )
}
