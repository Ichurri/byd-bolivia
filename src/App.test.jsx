import { render, screen } from '@testing-library/react'
import App from './App'

it('renders the showroom navigation and primary action', () => {
  render(<App />)

  expect(screen.getByRole('navigation', { name: /principal/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /ver modelos/i })).toHaveAttribute('href', '#modelos')
})
