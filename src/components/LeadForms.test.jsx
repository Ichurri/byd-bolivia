import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { vehicles } from '../data/vehicles'
import LeadForms from './LeadForms'

async function fillQuote(user) {
  await user.type(screen.getByRole('textbox', { name: /^nombre/i }), 'Ana Pérez')
  await user.type(screen.getByRole('textbox', { name: /teléfono/i }), '765-43 210')
  await user.selectOptions(screen.getByRole('combobox', { name: /ciudad/i }), 'La Paz')
  await user.click(screen.getByRole('checkbox', { name: /autorizo/i }))
}

it('normalizes and stores a valid quotation locally', async () => {
  const user = userEvent.setup()
  const saveLead = vi.fn()
  render(<LeadForms vehicles={vehicles} selectedVehicleId="dolphin-mini" onVehicleChange={vi.fn()} saveLead={saveLead} />)

  await fillQuote(user)
  await user.click(screen.getByRole('button', { name: /guardar solicitud/i }))

  expect(saveLead).toHaveBeenCalledWith('quote', expect.objectContaining({
    name: 'Ana Pérez', phone: '76543210', city: 'La Paz', modelId: 'dolphin-mini', consent: true,
  }))
  expect(screen.getByRole('status')).toHaveTextContent('Solicitud guardada en este navegador.')
})

it('shows inline validation errors for incomplete and past-date submissions', async () => {
  const user = userEvent.setup()
  render(<LeadForms vehicles={vehicles} selectedVehicleId="dolphin-mini" onVehicleChange={vi.fn()} saveLead={vi.fn()} />)

  await user.click(screen.getByRole('button', { name: /guardar solicitud/i }))
  expect(screen.getByText('Ingresa al menos 2 caracteres.')).toBeInTheDocument()

  await user.click(screen.getByRole('tab', { name: /prueba de manejo/i }))
  await user.type(screen.getByLabelText(/^nombre/i), 'Ana Pérez')
  await user.type(screen.getByLabelText(/teléfono/i), '76543210')
  await user.selectOptions(screen.getByLabelText(/ciudad/i), 'La Paz')
  await user.type(screen.getByLabelText(/fecha preferida/i), '2000-01-01')
  await user.click(screen.getByLabelText(/autorizo/i))
  await user.click(screen.getByRole('button', { name: /guardar reserva/i }))

  expect(screen.getByText('Selecciona una fecha futura.')).toBeInTheDocument()
})

it('keeps entered values when local storage fails', async () => {
  const user = userEvent.setup()
  const saveLead = vi.fn(() => { throw new DOMException('Full', 'QuotaExceededError') })
  render(<LeadForms vehicles={vehicles} selectedVehicleId="dolphin-mini" onVehicleChange={vi.fn()} saveLead={saveLead} />)

  await fillQuote(user)
  await user.click(screen.getByRole('button', { name: /guardar solicitud/i }))

  expect(screen.getByRole('alert')).toHaveTextContent('No pudimos guardar la solicitud en este navegador.')
  expect(screen.getByRole('textbox', { name: /^nombre/i })).toHaveValue('Ana Pérez')
})
