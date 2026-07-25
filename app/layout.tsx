import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Presupuestos España — Crítica & Redirección',
  description: 'Visualiza los presupuestos públicos de España y redirige el gasto político hacia los servicios que realmente importan.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-950 text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}