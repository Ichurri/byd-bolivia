import { useState } from 'react'
import { Trash } from '@phosphor-icons/react'
import { clearDemoData as clearStoredDemoData } from '../lib/storage'

export default function Footer({ clearDemoData = clearStoredDemoData }) {
  const [confirming, setConfirming] = useState(false)
  const [status, setStatus] = useState('')

  const clear = () => {
    clearDemoData()
    setConfirming(false)
    setStatus('Datos locales eliminados.')
  }

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="brand footer-brand"><span className="brand-mark">BYD</span><span className="brand-country">Bolivia</span></div>
        <p>Una demostración estática para explorar movilidad eléctrica y súper híbrida.</p>
        <a className="button button-ghost" href="#inicio">Volver arriba</a>
      </div>
      <div className="footer-notices">
        <p>Precios referenciales sujetos a confirmación y disponibilidad.</p>
        <p>La simulación es informativa y no constituye una oferta ni aprobación de crédito.</p>
        <p>Las pruebas de manejo están sujetas a disponibilidad y confirmación del concesionario.</p>
        <p>Los datos se guardan únicamente en este navegador y no se envían a terceros.</p>
      </div>
      <div className="privacy-row">
        <div>
          <strong>Control de datos de demostración</strong>
          <span>Puedes eliminar en cualquier momento todas las solicitudes guardadas aquí.</span>
        </div>
        {!confirming ? (
          <button className="delete-button" type="button" onClick={() => { setConfirming(true); setStatus('') }}><Trash size={17} /> Borrar datos guardados</button>
        ) : (
          <div className="delete-confirmation" role="group" aria-label="Confirmar borrado">
            <span>¿Eliminar todo?</span>
            <button type="button" onClick={clear}>Confirmar eliminación</button>
            <button type="button" onClick={() => setConfirming(false)}>Cancelar</button>
          </div>
        )}
      </div>
      <div className="footer-bottom"><span>© 2026 Concepto BYD Bolivia</span><span>Sitio de demostración · Sin envío de datos</span></div>
      <p className="footer-status" role="status">{status}</p>
    </footer>
  )
}
