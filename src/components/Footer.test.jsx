import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import Footer from './Footer'

it('requires confirmation before deleting locally stored demo data', async () => {
  const user = userEvent.setup()
  const clearDemoData = vi.fn()
  render(<Footer clearDemoData={clearDemoData} />)

  await user.click(screen.getByRole('button', { name: /borrar datos guardados/i }))
  expect(clearDemoData).not.toHaveBeenCalled()
  await user.click(screen.getByRole('button', { name: /confirmar eliminación/i }))

  expect(clearDemoData).toHaveBeenCalledOnce()
  expect(screen.getByRole('status')).toHaveTextContent('Datos locales eliminados.')
})
