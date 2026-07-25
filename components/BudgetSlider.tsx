'use client'

import { useState, useMemo } from 'react'
import { budgetData, criticismTargets } from '@/data/budgets'

interface Props {
  data: { category: string; amount: number; pct: number }[]
}

export default function BudgetSlider({ data }: Props) {
  const politicianIndices = data
    .map((d, i) => ({ ...d, idx: i, isPolitician: /político|asesor|gabinete|administración general|corporativos/i.test(d.category) }))
    .filter((d) => d.isPolitician)

  const serviceIndices = data
    .map((d, i) => ({ ...d, idx: i, isService: /bombero|sanidad|educación|seguridad|interior|protección civil|emergencias/i.test(d.category) }))
    .filter((d) => d.isService)

  const sliders = useMemo(() => {
    const result: Record<number, number> = {}
    politicianIndices.forEach((d) => { result[d.idx] = 0 })
    serviceIndices.forEach((d) => { result[d.idx] = 0 })
    return result
  }, [politicianIndices, serviceIndices])

  const [values, setValues] = useState(sliders)

  const handleChange = (idx: number, val: number) => {
    setValues((prev) => ({ ...prev, [idx]: val }))
  }

  const totalRedirected = Object.values(values).reduce((sum, v) => sum + v, 0)
  const politicianTotal = politicianIndices.reduce((s, d) => s + d.amount, 0)
  const serviceTotal = serviceIndices.reduce((s, d) => s + d.amount, 0)

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <h2 className="text-xl font-semibold mb-4">🎛 Tu redistribución</h2>
      <p className="text-gray-400 text-sm mb-6">
        Quita recursos de los políticos y llévatelos a los servicios que protegen este país.
        Lo que quites del "Ministerio/Políticos" se suma a "Bomberos/Sanidad/Educación/Seguridad".
      </p>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-bold text-red-400 mb-3 uppercase tracking-wider">
            Quitar de (política)
          </h3>
          {politicianIndices.map((d) => (
            <div key={d.idx} className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">{d.category}</span>
                <span className="text-red-400">−{values[d.idx] || 0} M€ ({d.pct}%)</span>
              </div>
              <input
                type="range"
                min="0"
                max={d.amount}
                step="50"
                value={values[d.idx] || 0}
                onChange={(e) => handleChange(d.idx, Number(e.target.value))}
                className="w-full accent-red-500"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>0 M€</span>
                <span>{d.amount.toLocaleString()} M€</span>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-4">
          <h3 className="text-sm font-bold text-green-400 mb-3 uppercase tracking-wider">
            Añadir a (servicios)
          </h3>
          {serviceIndices.map((d) => (
            <div key={d.idx} className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">{d.category}</span>
                <span className="text-green-400">+{values[d.idx] || 0} M€ ({d.pct}%)</span>
              </div>
              <input
                type="range"
                min="0"
                max={Math.min(d.amount + totalRedirected)}
                step="50"
                value={values[d.idx] || 0}
                onChange={(e) => handleChange(d.idx, Number(e.target.value))}
                className="w-full accent-green-500"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>0 M€</span>
                <span>{d.amount.toLocaleString()} M€ actual</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-800 rounded-lg text-center">
        <div className="text-2xl font-bold text-yellow-400">
          {totalRedirected.toLocaleString()} M€ redirigidos
        </div>
        <div className="text-xs text-gray-500 mt-1">
          De {politicianTotal.toLocaleString()} M€ disponibles en política → a servicios
        </div>
      </div>
    </div>
  )
}