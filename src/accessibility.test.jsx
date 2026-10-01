import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

it('exposes a navigable page structure and restores focus after closing details', async () => {
  const user = userEvent.setup()
  render(<App />)

  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  expect(screen.getByRole('navigation', { name: /principal/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /abrir navegación/i })).toHaveAttribute('aria-expanded', 'false')

  for (const link of screen.getAllByRole('link')) {
    const target = link.getAttribute('href')
    if (target?.startsWith('#')) expect(document.querySelector(target)).not.toBeNull()
  }

  for (const image of document.querySelectorAll('.vehicle-card img')) {
    expect(image.getAttribute('alt')).toBeTruthy()
  }

  expect(screen.getAllByRole('status').length).toBeGreaterThanOrEqual(3)

  const detailsButton = screen.getByRole('button', { name: /detalles de byd dolphin$/i })
  await user.click(detailsButton)
  expect(screen.getByRole('dialog')).toBeInTheDocument()
  await user.keyboard('{Escape}')

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  expect(detailsButton).toHaveFocus()
})
