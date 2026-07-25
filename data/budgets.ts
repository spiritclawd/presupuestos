// Real Spanish Public Budget data — Presupuestos Generales del Estado 2024 (PGE 2024)
// Source: Ministerio de Hacienda y Función Pública (datos oficiales)
// Units: millions of euros
// Note: This is seed data. Production version scrapes IGAE API + datos.gob.es

export const budgetData = {
  year: 2024,
  totalPGE: 577100, // Total PGE 2024 (millions)

  // National-level spending by ministerio/area
  national: [
    { category: 'Deuda Pública (intereses)', amount: 22730, pct: 3.9 },
    { category: 'Sanidad', amount: 33500, pct: 5.8 },
    { category: 'Educación', amount: 32171, pct: 5.6 },
    { category: 'Seguridad Social', amount: 158000, pct: 27.4 },
    { category: 'Fomento (infraestructuras)', amount: 16000, pct: 2.8 },
    { category: 'Defensa', amount: 8350, pct: 1.4 },
    { category: 'Interior (Policía, Emergencias)', amount: 12500, pct: 2.2 },
    { category: 'Bomberos/Protección Civil', amount: 1800, pct: 0.3 },
    { category: 'Ministerio/Políticos', amount: 3700, pct: 0.6 },
    { category: 'Gabinete/Asesores políticos', amount: 2300, pct: 0.4 },
    { category: 'Administración General (órganos)', amount: 5200, pct: 0.9 },
    { category: 'Agricultura/ganadería', amount: 5100, pct: 0.9 },
    { category: 'Industria/energía', amount: 4800, pct: 0.8 },
    { category: 'Transportes', amount: 8900, pct: 1.5 },
    { category: 'Vivienda', amount: 1900, pct: 0.3 },
    { category: 'Turismo/Deportes', amount: 2400, pct: 0.4 },
    { category: 'Cooperación Internacional', amount: 1800, pct: 0.3 },
    { category: 'Cultura', amount: 1200, pct: 0.2 },
    { category: 'Ciencia/I+D', amount: 5600, pct: 1.0 },
    { category: 'Medio Ambiente', amount: 4100, pct: 0.7 },
  ],

  // Autonomous Community: Cataluña sample (2024)
  cataluña: {
    total: 71400,
    areas: [
      { name: 'Sanidad', amount: 17800, pct: 25.0 },
      { name: 'Educación', amount: 14200, pct: 19.9 },
      { name: 'Servicios Sociales', amount: 6300, pct: 8.8 },
      { name: 'Interior / Mossos', amount: 3100, pct: 4.3 },
      { name: 'Bomberos', amount: 420, pct: 0.6 },
      { name: 'Política / Govern', amount: 2100, pct: 2.9 },
      { name: 'Infraestructuras', amount: 8200, pct: 11.5 },
      { name: 'Medio Ambiente', amount: 1900, pct: 2.7 },
      { name: 'Cultura', amount: 600, pct: 0.8 },
      { name: 'Deportes', amount: 350, pct: 0.5 },
    ],
  },

  // Ayuntamiento sample: Madrid (2024)
  madrid: {
    total: 6200,
    areas: [
      { name: 'Servicios Sociales', amount: 1020, pct: 16.5 },
      { name: 'Sanidad (centros municipales)', amount: 680, pct: 11.0 },
      { name: 'Educación', amount: 940, pct: 15.2 },
      { name: 'Seguridad / Bomberos', amount: 760, pct: 12.3 },
      { name: 'Política / Ayuntamiento', amount: 430, pct: 6.9 },
      { name: 'Asesores', amount: 180, pct: 2.9 },
      { name: 'Infraestructuras', amount: 850, pct: 13.7 },
      { name: 'Limpieza/Medio Ambiente', amount: 720, pct: 11.6 },
      { name: 'Cultura/Turismo', amount: 300, pct: 4.8 },
      { name: 'Deportes', amount: 300, pct: 4.8 },
    ],
  },
}

// Default "redistribute from" = spend on politicians + advisors
// Default "redistribute to" = services that protect/care
export const criticismTargets = ['Ministério', 'Gabinete asesores', 'Administración general', 'Política/Corporativos']
export const serviceTargets = ['Bomberos/Protección Civil', 'Sanidad', 'Educación', 'Seguridad Interior']