# BYD Bolivia Showroom Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium, static React showroom where visitors can explore and compare BYD vehicles, simulate financing, and save quotation or test-drive requests locally.

**Architecture:** A Vite + React single-page application with a shared vehicle data module and small feature components. Business rules live in pure utility modules tested with Vitest; browser persistence is isolated behind a storage adapter; the interface uses native CSS, local assets, and accessible React controls.

**Tech Stack:** React, Vite, JavaScript/JSX, native CSS, Phosphor Icons, Vitest, Testing Library, jsdom, localStorage.

---

## File map

- `package.json`: scripts and dependencies.
- `index.html`: Vite entry document and metadata.
- `src/main.jsx`: React bootstrap.
- `src/App.jsx`: page composition and shared selected-vehicle state.
- `src/data/vehicles.js`: canonical vehicle catalogue and labels.
- `src/lib/finance.js`: installment calculation and validation.
- `src/lib/storage.js`: versioned localStorage persistence.
- `src/lib/forms.js`: normalization and validation shared by lead forms.
- `src/components/Header.jsx`: desktop and mobile navigation.
- `src/components/Hero.jsx`: opening value proposition and primary CTA.
- `src/components/VehicleCatalog.jsx`: filterable model gallery.
- `src/components/VehicleCard.jsx`: individual vehicle summary.
- `src/components/VehicleDialog.jsx`: accessible model details.
- `src/components/ModelComparator.jsx`: two-to-three-vehicle comparison.
- `src/components/FinanceCalculator.jsx`: controlled financing simulator.
- `src/components/LeadForms.jsx`: quotation and test-drive tabs.
- `src/components/CommercialSections.jsx`: fleets, services, and revenue model.
- `src/components/Footer.jsx`: legal notices and local-data deletion.
- `src/styles.css`: design tokens, layout, states, motion, and responsive rules.
- `src/test/setup.js`: Testing Library matchers and cleanup.
- `src/**/*.test.{js,jsx}`: focused behavior tests.
- `public/vehicles/*`: locally stored vehicle imagery.

### Task 1: Scaffold the tested React application

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `src/main.jsx`
- Create: `src/App.jsx`
- Create: `src/test/setup.js`
- Create: `src/App.test.jsx`

- [ ] **Step 1: Initialize npm and install runtime and test dependencies**

Run:

```bash
cd /home/ichurri/Desktop/work/byd-bolivia
npm init -y
npm install react react-dom @phosphor-icons/react
npm install -D vite @vitejs/plugin-react vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Expected: `package.json` and `package-lock.json` exist and npm exits with code 0.

- [ ] **Step 2: Add scripts and Vitest configuration**

Set `package.json` scripts to:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

Add this top-level configuration:

```json
{
  "type": "module",
  "vitest": {
    "environment": "jsdom",
    "setupFiles": ["./src/test/setup.js"]
  }
}
```

- [ ] **Step 3: Write the failing application smoke test**

```jsx
// src/App.test.jsx
import { render, screen } from '@testing-library/react'
import App from './App'

it('renders the showroom navigation and primary action', () => {
  render(<App />)
  expect(screen.getByRole('navigation', { name: /principal/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /ver modelos/i })).toHaveAttribute('href', '#modelos')
})
```

- [ ] **Step 4: Run the test and verify failure**

Run: `npm test -- src/App.test.jsx`  
Expected: FAIL because `App` does not yet render the named navigation.

- [ ] **Step 5: Add the minimal app shell**

```jsx
// src/App.jsx
export default function App() {
  return (
    <>
      <header>
        <nav aria-label="Principal"><a href="#modelos">Ver modelos</a></nav>
      </header>
      <main id="contenido"><section id="modelos"><h1>BYD Bolivia</h1></section></main>
    </>
  )
}
```

Create `src/main.jsx` with `createRoot(document.getElementById('root')).render(<App />)`, create an `index.html` with `<div id="root"></div>`, and import `@testing-library/jest-dom/vitest` from `src/test/setup.js`.

- [ ] **Step 6: Verify and commit**

Run: `npm test -- src/App.test.jsx && npm run build`  
Expected: one passing test and a successful Vite production build.

```bash
git add package.json package-lock.json index.html src
git commit -m "chore: scaffold React showroom"
```

### Task 2: Add canonical vehicle data and local imagery

**Files:**
- Create: `src/data/vehicles.js`
- Create: `src/data/vehicles.test.js`
- Create: `public/vehicles/dolphin.webp`
- Create: `public/vehicles/dolphin-mini.webp`
- Create: `public/vehicles/yuan-pro.webp`
- Create: `public/vehicles/yuan-pro-dmi.webp`
- Create: `public/vehicles/song-plus.webp`
- Create: `public/vehicles/atto-8.webp`
- Create: `public/vehicles/shark.webp`

- [ ] **Step 1: Write catalogue integrity tests**

```js
import { describe, expect, it } from 'vitest'
import { vehicles } from './vehicles'

describe('vehicles', () => {
  it('contains seven uniquely identified models', () => {
    expect(vehicles).toHaveLength(7)
    expect(new Set(vehicles.map((vehicle) => vehicle.id)).size).toBe(7)
  })

  it('marks invented prices as demo references', () => {
    const invented = vehicles.filter((vehicle) => vehicle.priceStatus === 'demo')
    expect(invented.length).toBeGreaterThan(0)
    expect(invented.every((vehicle) => vehicle.price > 0)).toBe(true)
  })

  it('provides comparison fields and accessible images', () => {
    for (const vehicle of vehicles) {
      expect(vehicle).toMatchObject({
        name: expect.any(String), price: expect.any(Number), rangeKm: expect.any(Number),
        lengthMm: expect.any(Number), powerHp: expect.any(Number), image: expect.stringMatching(/^\/vehicles\//),
        imageAlt: expect.stringContaining(vehicle.name), features: expect.any(Array)
      })
    }
  })
})
```

- [ ] **Step 2: Run the test and verify failure**

Run: `npm test -- src/data/vehicles.test.js`  
Expected: FAIL because the catalogue module does not exist.

- [ ] **Step 3: Create the seven-model catalogue**

Export `vehicles` with IDs `dolphin`, `dolphin-mini`, `yuan-pro`, `yuan-pro-dmi`, `song-plus`, `atto-8`, and `shark`. Each object must include the fields asserted above plus `category`, `powertrain`, `rangeStandard`, `priceLabel`, `priceStatus`, `widthMm`, `heightMm`, and three concrete `features`. Use the supplied September prices for Dolphin Mini, Yuan Pro, Yuan Pro DM-i, Song Plus, and Shark; assign clearly marked demonstration prices to Dolphin and Atto 8.

- [ ] **Step 4: Save optimized product assets**

Use official BYD product pages as the source where practical. Save one image per model under `public/vehicles/`, convert to WebP, keep each image under 350 KB, and record source URLs in `public/vehicles/SOURCES.md`. Do not hotlink runtime images.

- [ ] **Step 5: Verify and commit**

Run: `npm test -- src/data/vehicles.test.js`  
Expected: three passing tests.

```bash
git add src/data public/vehicles
git commit -m "feat: add BYD vehicle catalogue"
```

### Task 3: Implement finance, validation, and persistence rules

**Files:**
- Create: `src/lib/finance.js`
- Create: `src/lib/finance.test.js`
- Create: `src/lib/forms.js`
- Create: `src/lib/forms.test.js`
- Create: `src/lib/storage.js`
- Create: `src/lib/storage.test.js`

- [ ] **Step 1: Write finance tests**

```js
import { expect, it } from 'vitest'
import { calculateMonthlyPayment, validateFinanceInput } from './finance'

it('splits zero-interest capital evenly', () => {
  expect(calculateMonthlyPayment({ price: 30000, downPayment: 6000, months: 48, annualRate: 0 })).toBe(500)
})

it('calculates an amortized positive-interest payment', () => {
  expect(calculateMonthlyPayment({ price: 30000, downPayment: 6000, months: 48, annualRate: 8.5 })).toBeCloseTo(591.57, 1)
})

it('rejects a down payment equal to price and out-of-range terms', () => {
  expect(validateFinanceInput({ price: 30000, downPayment: 30000, months: 96, annualRate: 45 })).toEqual({
    downPayment: 'La inicial debe ser menor al precio.',
    months: 'El plazo debe estar entre 12 y 84 meses.',
    annualRate: 'La tasa debe estar entre 0% y 40%.'
  })
})
```

- [ ] **Step 2: Run tests and verify failure**

Run: `npm test -- src/lib`  
Expected: FAIL because the utility modules do not exist.

- [ ] **Step 3: Implement pure finance functions**

```js
export function calculateMonthlyPayment({ price, downPayment, months, annualRate }) {
  const capital = price - downPayment
  const rate = annualRate / 100 / 12
  if (rate === 0) return capital / months
  const factor = (1 + rate) ** months
  return capital * rate * factor / (factor - 1)
}
```

Implement `validateFinanceInput` with the exact messages in the test and no errors for valid input.

- [ ] **Step 4: Add form validation tests and implementation**

Test `normalizePhone(' 765-43 210 ') === '76543210'`, reject names shorter than two characters, reject phones outside seven-to-eight digits, reject blank city/model/consent, and require a future `YYYY-MM-DD` date for test drives. Implement `validateQuote`, `validateTestDrive`, and `normalizePhone` in `forms.js`.

- [ ] **Step 5: Add storage tests and implementation**

Use injected storage for testability:

```js
const KEYS = { quote: 'byd-demo:quotes:v1', testDrive: 'byd-demo:test-drives:v1' }

export function saveLead(type, lead, storage = window.localStorage) {
  const key = KEYS[type]
  if (!key) throw new Error('Tipo de solicitud desconocido.')
  const current = JSON.parse(storage.getItem(key) || '[]')
  const record = { ...lead, id: crypto.randomUUID(), createdAt: new Date().toISOString() }
  storage.setItem(key, JSON.stringify([...current, record]))
  return record
}

export function clearDemoData(storage = window.localStorage) {
  Object.values(KEYS).forEach((key) => storage.removeItem(key))
}
```

Test successful append, invalid type, and complete deletion using a simple in-memory `getItem/setItem/removeItem` fake.

- [ ] **Step 6: Verify and commit**

Run: `npm test -- src/lib`  
Expected: all finance, form, and storage tests pass.

```bash
git add src/lib
git commit -m "feat: add finance and lead utilities"
```

### Task 4: Build the page shell, hero, and vehicle catalogue

**Files:**
- Create: `src/components/Header.jsx`
- Create: `src/components/Hero.jsx`
- Create: `src/components/VehicleCatalog.jsx`
- Create: `src/components/VehicleCard.jsx`
- Create: `src/components/VehicleDialog.jsx`
- Create: `src/components/VehicleCatalog.test.jsx`
- Modify: `src/App.jsx`
- Create: `src/styles.css`

- [ ] **Step 1: Write the catalogue interaction test**

Render `VehicleCatalog` with the first two vehicles and assert that both names render. Click “Detalles” for the first model; assert a dialog appears with the model name and “Usar en simulador”. Click that action and assert `onSelect` receives the first vehicle ID.

- [ ] **Step 2: Run the test and verify failure**

Run: `npm test -- src/components/VehicleCatalog.test.jsx`  
Expected: FAIL because the catalogue components do not exist.

- [ ] **Step 3: Implement accessible navigation and hero**

`Header` renders one-line desktop links to `#modelos`, `#comparar`, `#financiamiento`, `#empresas`, and `#contacto`, plus a mobile menu button with `aria-expanded`. `Hero` renders a compact eyebrow, a two-line maximum headline, a subtext of at most 20 words, “Ver modelos”, and “Simular cuota”.

- [ ] **Step 4: Implement catalogue and dialog**

`VehicleCatalog` accepts `{ vehicles, selectedVehicleId, onSelect }`, filters by `Todos`, `Eléctricos`, `Híbridos`, and `Pickup`, and owns `openVehicleId`. `VehicleCard` always shows price status, range standard, and powertrain. `VehicleDialog` uses the native `<dialog>` element, closes on Escape/cancel, restores focus, and offers “Usar en simulador”.

- [ ] **Step 5: Establish the premium design tokens**

Start `styles.css` with:

```css
:root {
  color-scheme: dark;
  --bg: #080b10;
  --surface: #101722;
  --surface-raised: #162130;
  --text: #f4f7fb;
  --muted: #aab6c6;
  --line: rgba(188, 210, 236, .16);
  --accent: #2687ff;
  --accent-strong: #0a6ee8;
  --danger: #ff6b73;
  --success: #63d7ac;
  --radius-card: 18px;
  --radius-control: 999px;
  font-family: "Arial Nova", "Aptos", system-ui, sans-serif;
}
```

Add a skip link, 72px maximum navigation height, split-screen hero that fits the initial desktop viewport, a staggered catalogue grid, visible focus rings, and 44px controls.

- [ ] **Step 6: Compose in App and verify**

Store `selectedVehicleId` in `App`, defaulting to `dolphin-mini`, and pass it to catalogue and later features. Import `styles.css` from `main.jsx`.

Run: `npm test -- src/components/VehicleCatalog.test.jsx src/App.test.jsx && npm run build`  
Expected: tests and build pass.

- [ ] **Step 7: Commit**

```bash
git add src public
git commit -m "feat: build showroom catalogue"
```

### Task 5: Build the three-model comparator

**Files:**
- Create: `src/components/ModelComparator.jsx`
- Create: `src/components/ModelComparator.test.jsx`
- Modify: `src/App.jsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Write limit and removal tests**

Render the comparator with seven vehicles. Select three unchecked models, then try a fourth; assert the status text says “Puedes comparar hasta 3 modelos.” Remove one selected model and assert the fourth can then be selected.

- [ ] **Step 2: Run test and verify failure**

Run: `npm test -- src/components/ModelComparator.test.jsx`  
Expected: FAIL because the comparator does not exist.

- [ ] **Step 3: Implement comparison behavior**

Initialize with `['dolphin-mini', 'yuan-pro']`. Use checkboxes for selection and an `aria-live="polite"` limit message. Render rows for price, price status, autonomy plus standard, dimensions, powertrain, power, and equipment. On narrow screens, make the comparison region horizontally scrollable with the first label column sticky.

- [ ] **Step 4: Verify and commit**

Run: `npm test -- src/components/ModelComparator.test.jsx && npm run build`  
Expected: comparator tests and build pass.

```bash
git add src/components/ModelComparator* src/App.jsx src/styles.css
git commit -m "feat: add model comparator"
```

### Task 6: Build the financing simulator

**Files:**
- Create: `src/components/FinanceCalculator.jsx`
- Create: `src/components/FinanceCalculator.test.jsx`
- Modify: `src/App.jsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Write the calculator behavior test**

Render with Dolphin Mini selected, change initial to `5000`, term to `60`, and annual rate to `8.5`; assert a monthly amount is rendered and the disclaimer “estimación informativa” is visible. Enter an initial equal to vehicle price and assert the specific validation error.

- [ ] **Step 2: Run test and verify failure**

Run: `npm test -- src/components/FinanceCalculator.test.jsx`  
Expected: FAIL because the calculator does not exist.

- [ ] **Step 3: Implement the controlled calculator**

Accept `{ vehicles, selectedVehicleId, onVehicleChange }`. Keep down payment, months, and annual rate as controlled string inputs; parse only for validation/calculation. Display vehicle price, financed capital, monthly payment, and total estimated payments. Use labels above inputs and error text linked with `aria-describedby`.

- [ ] **Step 4: Verify and commit**

Run: `npm test -- src/components/FinanceCalculator.test.jsx src/lib/finance.test.js`  
Expected: calculator and finance tests pass.

```bash
git add src/components/FinanceCalculator* src/App.jsx src/styles.css
git commit -m "feat: add financing simulator"
```

### Task 7: Build locally persisted quotation and test-drive forms

**Files:**
- Create: `src/components/LeadForms.jsx`
- Create: `src/components/LeadForms.test.jsx`
- Modify: `src/App.jsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Write the quotation success test**

Render with a mocked `saveLead`. Fill name, phone, city, choose a model, check consent, submit, and assert `saveLead('quote', ...)` receives normalized phone data and a success region says “Solicitud guardada en este navegador.”

- [ ] **Step 2: Write validation and storage-failure tests**

Submit the blank quotation form and assert required errors. For test drive, choose today and assert a future-date error. Make `saveLead` throw `QuotaExceededError`; assert entered values remain and the error says “No pudimos guardar la solicitud en este navegador.”

- [ ] **Step 3: Run tests and verify failure**

Run: `npm test -- src/components/LeadForms.test.jsx`  
Expected: FAIL because the forms do not exist.

- [ ] **Step 4: Implement tabbed forms**

Create accessible “Cotización” and “Prueba de manejo” tabs. Accept `{ vehicles, selectedVehicleId, onVehicleChange, saveLead }`. Use the shared validators, never clear values after storage failure, and reset only after a successful save. Include finance-interest on quotation and future preferred date on test drive.

- [ ] **Step 5: Verify and commit**

Run: `npm test -- src/components/LeadForms.test.jsx src/lib/forms.test.js src/lib/storage.test.js`  
Expected: all form and persistence tests pass.

```bash
git add src/components/LeadForms* src/App.jsx src/styles.css
git commit -m "feat: add local lead forms"
```

### Task 8: Add fleet, services, commercial model, and privacy controls

**Files:**
- Create: `src/components/CommercialSections.jsx`
- Create: `src/components/Footer.jsx`
- Create: `src/components/Footer.test.jsx`
- Modify: `src/App.jsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Write the local-data deletion test**

Render `Footer` with mocked `clearDemoData`, click “Borrar datos guardados”, confirm in the inline confirmation panel, and assert the function runs and the status says “Datos locales eliminados.”

- [ ] **Step 2: Run test and verify failure**

Run: `npm test -- src/components/Footer.test.jsx`  
Expected: FAIL because the footer does not exist.

- [ ] **Step 3: Implement commercial content**

`CommercialSections` renders a differentiated fleet block and a services strip for accessories, maintenance, and chargers. Add a concise revenue explanation separating direct vehicle/fleet/service revenue from third-party financial referral commissions that require authorized agreements.

- [ ] **Step 4: Implement footer and deletion confirmation**

Render all four legal notices from the design spec, a privacy explanation, and an inline two-button confirmation instead of `window.confirm`. The destructive action must call `clearDemoData`, close the confirmation, and announce success.

- [ ] **Step 5: Verify and commit**

Run: `npm test -- src/components/Footer.test.jsx && npm run build`  
Expected: footer test and build pass.

```bash
git add src/components/CommercialSections.jsx src/components/Footer* src/App.jsx src/styles.css
git commit -m "feat: add commercial and privacy sections"
```

### Task 9: Polish responsiveness, motion, and accessibility

**Files:**
- Modify: `src/styles.css`
- Modify: `src/components/Header.jsx`
- Modify: `src/components/VehicleDialog.jsx`
- Create: `src/accessibility.test.jsx`

- [ ] **Step 1: Add cross-feature accessibility assertions**

Render `App`; assert exactly one `h1`, all navigation targets exist, every form control has an accessible name, the mobile menu exposes `aria-expanded`, both live regions are present, and all product images have non-empty alt text.

- [ ] **Step 2: Run test and verify any failures**

Run: `npm test -- src/accessibility.test.jsx`  
Expected: test identifies any missing names, targets, or live regions.

- [ ] **Step 3: Complete responsive and reduced-motion rules**

At `max-width: 767px`, collapse every multi-column section, use a menu drawer, keep vehicle cards readable, make comparison scroll explicit, and switch forms to one column. At `prefers-reduced-motion: reduce`, disable smooth scrolling, transitions, and keyframe animation. Add `@supports not (backdrop-filter: blur(1px))` solid navigation fallback.

- [ ] **Step 4: Audit visual states**

Verify normal, hover, focus-visible, active, disabled, error, and success states for every button/input. Confirm button labels stay on one line on desktop and all text/input contrast meets WCAG AA.

- [ ] **Step 5: Verify and commit**

Run: `npm test && npm run build`  
Expected: all tests pass and build completes.

```bash
git add src
git commit -m "feat: polish responsive accessibility"
```

### Task 10: Run the complete acceptance pass

**Files:**
- Modify if required: `src/**/*`
- Modify if required: `README.md`
- Create: `README.md`

- [ ] **Step 1: Document local usage and demo limitations**

Write `README.md` with exact commands `npm install`, `npm run dev`, `npm test`, and `npm run build`; list the seven models; explain localStorage behavior; and state that prices, financing, and submissions are demonstrations.

- [ ] **Step 2: Run automated verification**

Run:

```bash
npm test
npm run build
```

Expected: zero failed tests and `dist/` generated successfully.

- [ ] **Step 3: Run browser acceptance checks**

At 390×844 and 1440×900, verify: no horizontal page overflow; hero CTA is visible initially; nav links scroll to their sections; catalogue detail works by keyboard; comparator caps at three; calculator handles 0% and 8.5%; invalid forms show inline errors; valid forms survive reload in localStorage; deletion removes both storage keys; motion is removed when the browser emulates reduced motion.

- [ ] **Step 4: Check production output**

Run: `npm run preview -- --host 127.0.0.1` and load the emitted URL.  
Expected: the production bundle loads without console errors, broken assets, or network requests for vehicle images.

- [ ] **Step 5: Commit the verified delivery**

```bash
git add README.md src public package.json package-lock.json
git commit -m "docs: finalize BYD showroom delivery"
```
