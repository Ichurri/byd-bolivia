import { useEffect, useState } from 'react'
import { CalendarBlank, CarProfile, CheckCircle, FileText } from '@phosphor-icons/react'
import { normalizePhone, validateQuote, validateTestDrive } from '../lib/forms'
import { saveLead as persistLead } from '../lib/storage'

const cities = ['La Paz', 'Santa Cruz', 'Cochabamba', 'Sucre', 'Tarija', 'Oruro', 'Potosí', 'Trinidad']

const baseValues = (modelId) => ({ name: '', phone: '', city: '', modelId, consent: false })

function FieldError({ id, children }) {
  return children ? <span className="field-error" id={id}>{children}</span> : null
}

function ContactFields({ values, setValues, errors, vehicles, prefix, onVehicleChange }) {
  const set = (key, value) => setValues((current) => ({ ...current, [key]: value }))
  return (
    <>
      <div className="field-block">
        <label htmlFor={`${prefix}-name`}>Nombre completo</label>
        <input id={`${prefix}-name`} value={values.name} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? `${prefix}-name-error` : undefined} onChange={(event) => set('name', event.target.value)} autoComplete="name" />
        <FieldError id={`${prefix}-name-error`}>{errors.name}</FieldError>
      </div>
      <div className="field-block">
        <label htmlFor={`${prefix}-phone`}>Teléfono</label>
        <input id={`${prefix}-phone`} value={values.phone} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? `${prefix}-phone-error` : undefined} onChange={(event) => set('phone', event.target.value)} inputMode="tel" autoComplete="tel" placeholder="76543210" />
        <FieldError id={`${prefix}-phone-error`}>{errors.phone}</FieldError>
      </div>
      <div className="field-block">
        <label htmlFor={`${prefix}-city`}>Ciudad</label>
        <select id={`${prefix}-city`} value={values.city} aria-invalid={Boolean(errors.city)} onChange={(event) => set('city', event.target.value)}>
          <option value="">Selecciona tu ciudad</option>
          {cities.map((city) => <option key={city} value={city}>{city}</option>)}
        </select>
        <FieldError id={`${prefix}-city-error`}>{errors.city}</FieldError>
      </div>
      <div className="field-block">
        <label htmlFor={`${prefix}-model`}>Modelo de interés</label>
        <select
          id={`${prefix}-model`}
          value={values.modelId}
          aria-invalid={Boolean(errors.modelId)}
          onChange={(event) => { set('modelId', event.target.value); onVehicleChange(event.target.value) }}
        >
          {vehicles.map((vehicle) => <option key={vehicle.id} value={vehicle.id}>{vehicle.name}</option>)}
        </select>
        <FieldError id={`${prefix}-model-error`}>{errors.modelId}</FieldError>
      </div>
    </>
  )
}

export default function LeadForms({ vehicles, selectedVehicleId, onVehicleChange, saveLead = persistLead }) {
  const [tab, setTab] = useState('quote')
  const [quote, setQuote] = useState({ ...baseValues(selectedVehicleId), financeInterest: true })
  const [drive, setDrive] = useState({ ...baseValues(selectedVehicleId), date: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')
  const [storageError, setStorageError] = useState('')

  useEffect(() => {
    setQuote((current) => ({ ...current, modelId: selectedVehicleId }))
    setDrive((current) => ({ ...current, modelId: selectedVehicleId }))
  }, [selectedVehicleId])

  const changeTab = (nextTab) => {
    setTab(nextTab)
    setErrors({})
    setStatus('')
    setStorageError('')
  }

  const submitQuote = (event) => {
    event.preventDefault()
    const nextErrors = validateQuote(quote)
    setErrors(nextErrors)
    setStatus('')
    setStorageError('')
    if (Object.keys(nextErrors).length) return
    try {
      saveLead('quote', { ...quote, name: quote.name.trim(), phone: normalizePhone(quote.phone) })
      setQuote({ ...baseValues(selectedVehicleId), financeInterest: true })
      setStatus('Solicitud guardada en este navegador.')
    } catch {
      setStorageError('No pudimos guardar la solicitud en este navegador.')
    }
  }

  const submitDrive = (event) => {
    event.preventDefault()
    const nextErrors = validateTestDrive(drive)
    setErrors(nextErrors)
    setStatus('')
    setStorageError('')
    if (Object.keys(nextErrors).length) return
    try {
      saveLead('testDrive', { ...drive, name: drive.name.trim(), phone: normalizePhone(drive.phone) })
      setDrive({ ...baseValues(selectedVehicleId), date: '' })
      setStatus('Solicitud guardada en este navegador.')
    } catch {
      setStorageError('No pudimos guardar la solicitud en este navegador.')
    }
  }

  return (
    <section className="contact-section" id="contacto" aria-labelledby="contact-title">
      <div className="section-shell contact-layout">
        <div className="contact-copy">
          <h2 id="contact-title">El próximo paso empieza aquí.</h2>
          <p>Guarda una solicitud de demostración para cotizar o conocer tu BYD preferido.</p>
          <div className="local-note">
            <CheckCircle size={22} />
            <div><strong>Privado por diseño</strong><span>Tus datos permanecen únicamente en este navegador.</span></div>
          </div>
        </div>

        <div className="lead-panel">
          <div className="form-tabs" role="tablist" aria-label="Tipo de solicitud">
            <button type="button" role="tab" aria-selected={tab === 'quote'} onClick={() => changeTab('quote')}><FileText size={18} /> Cotización</button>
            <button type="button" role="tab" aria-selected={tab === 'drive'} onClick={() => changeTab('drive')}><CarProfile size={18} /> Prueba de manejo</button>
          </div>

          {tab === 'quote' ? (
            <form className="lead-form" onSubmit={submitQuote} noValidate>
              <div className="form-intro"><h3>Solicita una cotización</h3><p>Los datos se guardarán localmente para esta demostración.</p></div>
              <div className="form-grid">
                <ContactFields values={quote} setValues={setQuote} errors={errors} vehicles={vehicles} prefix="quote" onVehicleChange={onVehicleChange} />
              </div>
              <label className="check-row"><input type="checkbox" checked={quote.financeInterest} onChange={(event) => setQuote((current) => ({ ...current, financeInterest: event.target.checked }))} /><span>Deseo recibir información sobre financiamiento.</span></label>
              <label className="check-row"><input type="checkbox" checked={quote.consent} onChange={(event) => setQuote((current) => ({ ...current, consent: event.target.checked }))} /><span>Autorizo guardar estos datos localmente en este navegador.</span></label>
              <FieldError id="quote-consent-error">{errors.consent}</FieldError>
              <button className="button lead-submit" type="submit">Guardar solicitud</button>
            </form>
          ) : (
            <form className="lead-form" onSubmit={submitDrive} noValidate>
              <div className="form-intro"><h3>Reserva una prueba de manejo</h3><p>La fecha queda sujeta a disponibilidad y confirmación del concesionario.</p></div>
              <div className="form-grid">
                <ContactFields values={drive} setValues={setDrive} errors={errors} vehicles={vehicles} prefix="drive" onVehicleChange={onVehicleChange} />
                <div className="field-block form-span-2">
                  <label htmlFor="drive-date">Fecha preferida</label>
                  <div className="date-input"><CalendarBlank size={18} /><input id="drive-date" type="date" value={drive.date} aria-invalid={Boolean(errors.date)} onChange={(event) => setDrive((current) => ({ ...current, date: event.target.value }))} /></div>
                  <FieldError id="drive-date-error">{errors.date}</FieldError>
                </div>
              </div>
              <label className="check-row"><input type="checkbox" checked={drive.consent} onChange={(event) => setDrive((current) => ({ ...current, consent: event.target.checked }))} /><span>Autorizo guardar estos datos localmente en este navegador.</span></label>
              <FieldError id="drive-consent-error">{errors.consent}</FieldError>
              <button className="button lead-submit" type="submit">Guardar reserva</button>
            </form>
          )}
          <div className="form-status" role="status">{status}</div>
          {storageError && <div className="form-alert" role="alert">{storageError}</div>}
        </div>
      </div>
    </section>
  )
}
