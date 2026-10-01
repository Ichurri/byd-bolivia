import { useState } from 'react'
import { List, X } from '@phosphor-icons/react'

const links = [
  ['Modelos', '#modelos'],
  ['Comparar', '#comparar'],
  ['Financiamiento', '#financiamiento'],
  ['Empresas', '#empresas'],
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Principal">
        <a className="brand" href="#inicio" aria-label="BYD Bolivia, inicio">
          <span className="brand-mark">BYD</span>
          <span className="brand-country">Bolivia</span>
        </a>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Cerrar navegación' : 'Abrir navegación'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <List size={22} />}
        </button>
        <div id="mobile-navigation" className={`nav-links ${open ? 'is-open' : ''}`}>
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a className="button button-small" href="#contacto" onClick={() => setOpen(false)}>Cotizar</a>
        </div>
      </nav>
    </header>
  )
}
