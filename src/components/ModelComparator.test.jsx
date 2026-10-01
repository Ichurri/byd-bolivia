import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vehicles } from '../data/vehicles'
import ModelComparator from './ModelComparator'

it('limits comparison to three models and allows replacing one', async () => {
  const user = userEvent.setup()
  render(<ModelComparator vehicles={vehicles} />)

  await user.click(screen.getByRole('checkbox', { name: /comparar byd song plus/i }))
  await user.click(screen.getByRole('checkbox', { name: /comparar byd shark/i }))

  expect(screen.getByRole('status')).toHaveTextContent('Puedes comparar hasta 3 modelos.')
  expect(screen.getByRole('checkbox', { name: /comparar byd shark/i })).not.toBeChecked()

  await user.click(screen.getByRole('checkbox', { name: /comparar byd yuan pro$/i }))
  await user.click(screen.getByRole('checkbox', { name: /comparar byd shark/i }))

  expect(screen.getByRole('checkbox', { name: /comparar byd shark/i })).toBeChecked()
})
