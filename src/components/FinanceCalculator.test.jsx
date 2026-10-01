import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { vehicles } from '../data/vehicles'
import FinanceCalculator from './FinanceCalculator'

it('calculates a monthly estimate and validates the down payment', async () => {
  const user = userEvent.setup()
  render(
    <FinanceCalculator
      vehicles={vehicles}
      selectedVehicleId="dolphin-mini"
      onVehicleChange={vi.fn()}
    />,
  )

  const downPayment = screen.getByRole('spinbutton', { name: /cuota inicial/i })
  await user.clear(downPayment)
  await user.type(downPayment, '5000')
  await user.selectOptions(screen.getByRole('combobox', { name: /plazo/i }), '60')
  const rate = screen.getByRole('spinbutton', { name: /tasa anual/i })
  await user.clear(rate)
  await user.type(rate, '8.5')

  expect(screen.getByTestId('monthly-payment')).toHaveTextContent(/\$us\s?408/i)
  expect(screen.getByText(/estimación informativa/i)).toBeInTheDocument()

  await user.clear(downPayment)
  await user.type(downPayment, '24900')
  expect(screen.getByText('La inicial debe ser menor al precio.')).toBeInTheDocument()
})
