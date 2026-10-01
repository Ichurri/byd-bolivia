import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { vehicles } from '../data/vehicles'
import VehicleCatalog from './VehicleCatalog'

it('opens model details and sends the vehicle to the simulator', async () => {
  const user = userEvent.setup()
  const onSelect = vi.fn()

  render(
    <VehicleCatalog
      vehicles={vehicles.slice(0, 2)}
      selectedVehicleId="dolphin-mini"
      onSelect={onSelect}
    />,
  )

  expect(screen.getByRole('heading', { name: 'BYD Dolphin' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'BYD Dolphin Mini' })).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /detalles de byd dolphin$/i }))

  expect(screen.getByRole('dialog', { name: /byd dolphin$/i })).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: /usar en simulador/i }))
  expect(onSelect).toHaveBeenCalledWith('dolphin')
})
