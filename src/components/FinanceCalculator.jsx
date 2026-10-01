import { useEffect, useMemo, useState } from 'react'
import { Calculator, Info, TrendUp } from '@phosphor-icons/react'
import { calculateMonthlyPayment, validateFinanceInput } from '../lib/finance'

const terms = [12, 24, 36, 48, 60, 72, 84]
const formatMoney = (amount) => `$us ${Math.round(amount).toLocaleString('es-BO')}`

export default function FinanceCalculator({ vehicles, selectedVehicleId, onVehicleChange }) {
  const vehicle = vehicles.find((item) => item.id === selectedVehicleId) ?? vehicles[0]
  const [downPayment, setDownPayment] = useState(String(Math.round(vehicle.price * .2)))
  const [months, setMonths] = useState('60')
  const [annualRate, setAnnualRate] = useState('8.5')

  useEffect(() => {
    setDownPayment(String(Math.round(vehicle.price * .2)))
  }, [vehicle.id, vehicle.price])

  const numbers = {
    price: vehicle.price,
    downPayment: Number(downPayment),
    months: Number(months),
    annualRate: Number(annualRate),
  }
  const errors = validateFinanceInput(numbers)
  const valid = Object.keys(errors).length === 0
  const monthlyPayment = useMemo(
    () => valid ? calculateMonthlyPayment(numbers) : 0,
    [valid, numbers.price, numbers.downPayment, numbers.months, numbers.annualRate],
  )
  const capital = valid ? numbers.price - numbers.downPayment : 0
  const total = valid ? monthlyPayment * numbers.months + numbers.downPayment : 0

  return (
    <section className="finance-section" id="financiamiento" aria-labelledby="finance-title">
      <div className="section-shell finance-layout">
        <div className="finance-intro">
          <div className="finance-icon"><Calculator size={24} /></div>
          <h2 id="finance-title">Haz que el número tenga sentido.</h2>
          <p>Configura una estimación mensual y descubre qué modelo se adapta mejor a tu presupuesto.</p>
          <div className="finance-car">
            <img src={vehicle.image} alt="" />
            <div><span>Modelo seleccionado</span><strong>{vehicle.name}</strong><small>{vehicle.priceLabel}</small></div>
          </div>
        </div>

        <div className="calculator-panel">
          <div className="field-block">
            <label htmlFor="finance-model">Vehículo</label>
            <select id="finance-model" value={vehicle.id} onChange={(event) => onVehicleChange(event.target.value)}>
              {vehicles.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.priceLabel}</option>)}
            </select>
          </div>
          <div className="calculator-fields">
            <div className="field-block">
              <label htmlFor="down-payment">Cuota inicial (USD)</label>
              <input
                id="down-payment"
                type="number"
                min="0"
                step="100"
                value={downPayment}
                aria-describedby={errors.downPayment ? 'down-payment-error' : undefined}
                aria-invalid={Boolean(errors.downPayment)}
                onChange={(event) => setDownPayment(event.target.value)}
              />
              {errors.downPayment && <span className="field-error" id="down-payment-error">{errors.downPayment}</span>}
            </div>
            <div className="field-block">
              <label htmlFor="finance-term">Plazo</label>
              <select id="finance-term" value={months} onChange={(event) => setMonths(event.target.value)}>
                {terms.map((term) => <option key={term} value={term}>{term} meses</option>)}
              </select>
              {errors.months && <span className="field-error">{errors.months}</span>}
            </div>
            <div className="field-block">
              <label htmlFor="annual-rate">Tasa anual referencial (%)</label>
              <input
                id="annual-rate"
                type="number"
                min="0"
                max="40"
                step="0.1"
                value={annualRate}
                aria-describedby={errors.annualRate ? 'annual-rate-error' : undefined}
                aria-invalid={Boolean(errors.annualRate)}
                onChange={(event) => setAnnualRate(event.target.value)}
              />
              {errors.annualRate && <span className="field-error" id="annual-rate-error">{errors.annualRate}</span>}
            </div>
          </div>

          <div className="payment-result" aria-live="polite">
            <div>
              <span>Cuota mensual estimada</span>
              <strong data-testid="monthly-payment">{valid ? formatMoney(monthlyPayment) : '—'}</strong>
              <small>por {months} meses</small>
            </div>
            <TrendUp size={30} />
          </div>
          <div className="finance-summary">
            <span><small>Capital financiado</small><strong>{valid ? formatMoney(capital) : '—'}</strong></span>
            <span><small>Total estimado</small><strong>{valid ? formatMoney(total) : '—'}</strong></span>
          </div>
          <p className="finance-disclaimer"><Info size={17} /> Esta es una estimación informativa; no constituye oferta ni aprobación de crédito.</p>
          <a className="button finance-cta" href="#contacto">Solicitar cotización</a>
        </div>
      </div>
    </section>
  )
}
