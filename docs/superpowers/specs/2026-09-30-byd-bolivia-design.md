# Diseño: Showroom digital BYD Bolivia

**Fecha:** 2026-09-30  
**Estado:** aprobado en conversación, pendiente de revisión del documento  
**Destino del proyecto:** `/home/ichurri/Desktop/work/byd-bolivia`

## 1. Propósito

Crear una web React estática, en español, orientada a compradores particulares y empresas en Bolivia. El sitio debe ayudar a descubrir vehículos BYD, comparar alternativas, estimar una cuota mensual y registrar localmente solicitudes de cotización o prueba de manejo.

El producto es una demostración comercial: no procesa pagos, no aprueba créditos, no transmite datos y no promete disponibilidad. Todos los precios añadidos para modelos sin precio confirmado se presentarán como referenciales para demostración.

## 2. Alcance

La primera versión tendrá una sola página tipo showroom con navegación por anclas y estas áreas:

1. Hero de producto con acceso al catálogo.
2. Catálogo de siete modelos: BYD Dolphin, Dolphin Mini, Yuan Pro, Yuan Pro DM-i, Song Plus, Atto 8 y Shark.
3. Comparador de dos o tres modelos.
4. Simulador de cuotas mensuales.
5. Formulario de cotización.
6. Reserva de prueba de manejo.
7. Bloque para empresas y flotas.
8. Servicios complementarios: accesorios, mantenimiento y cargadores.
9. Explicación breve del modelo comercial y sus límites.
10. Pie con avisos de privacidad y carácter referencial.

Quedan fuera de alcance: backend, autenticación, pagos, inventario en tiempo real, envío de correos, integración bancaria, CRM, panel administrativo y aprobación de créditos.

## 3. Dirección visual

La dirección elegida es **Tecnología premium**.

- Fondo grafito casi negro y superficies azul grisáceo.
- Azul eléctrico como único acento de marca.
- Tipografía sans serif geométrica, con títulos grandes y compactos.
- Fotografía de vehículos protagonista, con iluminación fría, reflejos y sombras suaves.
- Composición asimétrica y espaciosa; se evitarán cuadrículas de tarjetas repetitivas.
- Tarjetas con esquinas suaves y botones tipo píldora.
- Movimiento moderado en entradas, selección y cambio de datos.
- Compatibilidad con `prefers-reduced-motion`.
- Contraste WCAG AA en texto, controles y estados de formulario.

En escritorio el hero será dividido entre mensaje y vehículo. En móvil, los bloques de varias columnas se apilarán, la navegación será compacta y todos los formularios tendrán una sola columna.

## 4. Datos de vehículos

Los datos vivirán en un único módulo, con una estructura uniforme por vehículo:

- identificador y nombre comercial;
- categoría y tipo de motorización;
- imagen y texto alternativo;
- precio base y estado del precio;
- autonomía y estándar de medición;
- dimensiones;
- potencia o desempeño principal;
- equipamiento destacado;
- etiqueta de disponibilidad.

Los precios de la imagen proporcionada por el usuario se incorporarán como referencia de septiembre:

- Dolphin Mini GL/GS: USD 24.900 / 25.900.
- Yuan Pro EV / DM-i GS: USD 34.000 / 35.000.
- Song Plus GS: USD 41.550.
- Shark GS: USD 59.800; se mostrará como modelo destacado dentro del catálogo.

Para los modelos del sitio oficial sin precio confirmado se usarán valores inventados plausibles y se etiquetarán de forma visible como **“Precio referencial de demostración”**. La interfaz nunca los presentará como oferta vigente.

## 5. Interacciones

### Catálogo

El usuario podrá explorar las fichas y abrir una vista ampliada con datos relevantes. Elegir un vehículo actualizará la selección activa compartida con simulador y formularios.

### Comparador

Permitirá seleccionar entre dos y tres modelos. Mostrará precio, autonomía, tamaño, motorización, desempeño y equipamiento en una tabla adaptable. Al intentar añadir un cuarto vehículo aparecerá un mensaje contextual para retirar uno primero.

### Simulador

Entradas: vehículo, precio, cuota inicial, plazo en meses y tasa anual referencial. La cuota se calculará con amortización mensual estándar:

`cuota = capital × r × (1 + r)^n / ((1 + r)^n - 1)`

donde `capital` es precio menos inicial, `r` es la tasa mensual y `n` es el plazo. Si la tasa es 0, la cuota será `capital / n`.

Validaciones:

- inicial mayor o igual a cero y menor que el precio;
- tasa entre 0% y 40% anual;
- plazo entre 12 y 84 meses;
- resultado marcado como estimación no vinculante.

### Formularios

Cotización: nombre, teléfono, ciudad, modelo, interés en financiamiento y consentimiento.  
Prueba de manejo: nombre, teléfono, ciudad, modelo, fecha preferida y consentimiento.

La fecha debe ser futura. El teléfono aceptará formato boliviano flexible y se normalizará antes de guardar. Los errores aparecerán debajo del campo correspondiente.

## 6. Persistencia y privacidad

No habrá transmisión de información. Cada envío válido se guardará en `localStorage` con identificador, tipo y fecha de creación. Se usarán claves versionadas para cotizaciones y pruebas de manejo.

Después de guardar, el formulario mostrará una confirmación clara. Una opción visible en el pie permitirá borrar todos los datos de demostración guardados en ese navegador, previa confirmación.

Si `localStorage` no está disponible o alcanza su cuota, se mostrará un error y el formulario conservará los valores ingresados.

## 7. Arquitectura frontend

Proyecto Vite + React, con componentes separados por responsabilidad:

- `App`: composición general y selección activa de vehículo.
- `Header` y navegación móvil.
- `Hero`.
- `VehicleCatalog`, `VehicleCard` y detalle.
- `ModelComparator`.
- `FinanceCalculator`.
- `QuoteForm` y `TestDriveForm`.
- `FleetSection` y `ServicesSection`.
- utilidades de cálculo, validación y persistencia.
- módulo único de datos de vehículos.

El estado será local a cada función y se elevará a `App` únicamente cuando deba compartirse. No se añadirá una librería de estado global.

## 8. Estados y accesibilidad

- Imágenes con texto alternativo y fondo de respaldo si fallan.
- Navegación por teclado y anillos de enfoque visibles.
- Formularios con etiquetas persistentes, mensajes asociados y regiones de estado accesibles.
- Diálogos con control de foco y cierre mediante Escape.
- Estados vacío, límite, error y éxito para comparador y formularios.
- Controles táctiles de al menos 44 píxeles.

## 9. Verificación

La entrega se considerará lista cuando:

1. La compilación de producción termine sin errores.
2. El cálculo financiero cubra tasa cero, tasa positiva y límites inválidos.
3. El comparador impida más de tres modelos.
4. Los formularios bloqueen datos inválidos y persistan envíos válidos.
5. Los datos sobrevivan una recarga y puedan borrarse.
6. La página funcione sin desbordamiento horizontal en móvil y escritorio.
7. Los CTA, campos y texto principal mantengan contraste suficiente.
8. El sitio respete reducción de movimiento.

## 10. Mensajes legales y comerciales

Se mostrarán avisos breves y legibles:

- “Precios referenciales sujetos a confirmación y disponibilidad.”
- “La simulación es informativa y no constituye una oferta ni aprobación de crédito.”
- “Las pruebas de manejo están sujetas a disponibilidad y confirmación del concesionario.”
- “Los datos se guardan únicamente en este navegador y no se envían a terceros.”
- Las comisiones por referidos financieros solo se mencionarán como posibilidad condicionada a acuerdos autorizados.

## 11. Criterio de éxito

Un visitante debe poder identificar un modelo de interés, compararlo, obtener una cuota estimada y registrar una solicitud local en menos de tres minutos, entendiendo en todo momento qué información es referencial y que no se ha enviado ninguna solicitud real.
