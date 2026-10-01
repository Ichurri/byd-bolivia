# BYD Bolivia Showroom

Showroom estático en React para explorar vehículos BYD, comparar modelos, estimar cuotas mensuales y guardar solicitudes de cotización o prueba de manejo en el navegador.

## Inicio rápido

```bash
npm install
npm run dev
```

Vite mostrará la URL local, normalmente `http://localhost:5173`.

## Verificación

```bash
npm test
npm run build
```

El resultado de producción se genera en `dist/`. Para revisarlo localmente:

```bash
npm run preview
```

Con la configuración de GitHub Pages, la vista previa se sirve bajo
`http://localhost:4173/byd-bolivia/`.

## Despliegue en GitHub Pages

El workflow `.github/workflows/deploy.yml` ejecuta las pruebas, compila la
aplicación y publica `dist/` cuando se envían cambios a `main`.

1. En GitHub, abre **Settings → Pages**.
2. En **Build and deployment → Source**, selecciona **GitHub Actions**.
3. Envía los cambios a la rama `main`.
4. Revisa el progreso en la pestaña **Actions**.

La URL esperada para el repositorio `byd-bolivia` es:

```text
https://TU_USUARIO.github.io/byd-bolivia/
```

Si cambia el nombre del repositorio, también debe actualizarse `base` en
`vite.config.js`.

## Modelos incluidos

- BYD Dolphin
- BYD Dolphin Mini
- BYD Yuan Pro
- BYD Yuan Pro DM-i
- BYD Song Plus
- BYD Atto 8
- BYD Shark

Las imágenes fueron obtenidas de páginas oficiales de BYD y se sirven localmente desde `public/vehicles/`. Sus fuentes están documentadas en `public/vehicles/SOURCES.md`.

## Datos y privacidad

La aplicación no incluye backend ni transmite información. Las solicitudes válidas se almacenan en `localStorage` bajo estas claves versionadas:

- `byd-demo:quotes:v1`
- `byd-demo:test-drives:v1`

El pie de página ofrece un control para eliminar ambas colecciones. Si el almacenamiento local no está disponible, el formulario conserva los valores y muestra un error contextual.

## Límites de la demostración

- Los precios son referenciales; algunos fueron creados únicamente para la demostración.
- La cuota mensual es una estimación basada en amortización estándar.
- No existe aprobación ni oferta de crédito.
- Las solicitudes no se envían a un concesionario.
- Las pruebas de manejo están sujetas a disponibilidad y confirmación externa.
- Las comisiones por referidos financieros requerirían acuerdos autorizados con terceros.

## Estructura principal

```text
src/
  components/   Interfaz y secciones de la página
  data/         Catálogo canónico de vehículos
  lib/          Cálculo, validación y persistencia
  test/         Configuración de pruebas
public/
  vehicles/     Imágenes locales optimizadas y fuentes
```
