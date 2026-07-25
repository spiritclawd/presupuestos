'use client'

import { useState, useMemo, useCallback } from 'react'
import { budgetData } from '@/data/budgets'

interface SliderState {
  [key: string]: number
}

function getSliderRange(value: number, max: number): { min: number; max: number; step: number } {
  if (max <= 5000) return { min: 0, max, step: 50 }
  if (max <= 50000) return { min: 0, max, step: 100 }
  return { min: 0, max, step: 500 }
}

function getImpactLevel(redirected: number, totalAvailable: number): { label: string; color: string; emoji: string } {
  const pct = totalAvailable > 0 ? redirected / totalAvailable : 0
  if (pct === 0) return { label: 'Sin cambio', color: 'text-gray-500', emoji: '⏸️' }
  if (pct < 0.1) return { label: 'Tocado', color: 'text-yellow-400', emoji: '⚡' }
  if (pct < 0.3) return { label: 'Impacto moderado', color: 'text-blue-400', emoji: '🔵' }
  if (pct < 0.6) return { label: 'Impacto alto', color: 'text-purple-400', emoji: '🟣' }
  return { label: 'Revolución total', color: 'text-red-400', emoji: '🔥' }
}

function getBadge(pct: number): { label: string; bg: string } {
  if (pct === 0) return { label: '👤 Novato', bg: 'bg-gray-600' }
  if (pct < 5) return { label: '🟢 Ciudadano', bg: 'bg-green-700' }
  if (pct < 15) return { label: '🔵 Activista', bg: 'bg-blue-700' }
  if (pct < 30) return { label: '🟣 Reformista', bg: 'bg-purple-700' }
  if (pct < 50) return { label: '🔴 Revolucionario', bg: 'bg-red-700' }
  return { label: '💀 Extremista', bg: 'bg-red-900' }
}

export default function BudgetSlider({ data }: { data: { category: string; amount: number; pct: number }[] }) {
  const politicianIndices = data
    .map((d, i) => ({ ...d, idx: i, isPolitician: /politico|asesor|gabinete|administracion general|corporativos/i.test(d.category) }))
    .filter((d) => d.isPolitician)

  const serviceIndices = data
    .map((d, i) => ({ ...d, idx: i, isService: /bombero|sanidad|educacion|seguridad|interior|proteccion civil|emergencias/i.test(d.category) }))
    .filter((d) => d.isService)

  const initialSliders: SliderState = {}
  politicianIndices.forEach((d) => { initialSliders[`pol_${d.idx}`] = 0 })
  serviceIndices.forEach((d) => { initialSliders[`svc_${d.idx}`] = 0 })

  const [values, setValues] = useState<SliderState>(initialSliders)
  const [showSummary, setShowSummary] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = useCallback((key: string, val: number) => {
    setValues((prev) => ({ ...prev, [key]: val }))
  }, [])

  const totalRedirected = Object.values(values).reduce((sum, v) => sum + v, 0)
  const politicianTotal = politicianIndices.reduce((s, d) => s + d.amount, 0)

  const impact = getImpactLevel(totalRedirected, politicianTotal)
  const pctOfPoliticians = politicianTotal > 0 ? (totalRedirected / politicianTotal) * 100 : 0
  const badge = getBadge(pctOfPoliticians)

  // Points system
  const maxPossibleRedirected = politicianTotal
  const points = maxPossibleRedirected > 0 ? Math.round((totalRedirected / maxPossibleRedirected) * 1000) : 0

  const handleSubmit = () => {
    setSubmitted(true)
    // Save to localStorage
    try {
      const entry = {
        points,
        redirected: totalRedirected,
        pct: pctOfPoliticians.toFixed(1),
        badge: badge.label,
        timestamp: new Date().toISOString(),
        values: { ...values },
      }
      const existing = JSON.parse(localStorage.getItem('presupuestos_leaderboard') || '[]')
      existing.push(entry)
      localStorage.setItem('presupuestos_leaderboard', JSON.stringify(existing.slice(-50)))
    } catch (e) { /* localStorage not available */ }
  }

  const reset = () => {
    const resetValues: SliderState = {}
    politicianIndices.forEach((d) => { resetValues[`pol_${d.idx}`] = 0 })
    serviceIndices.forEach((d) => { resetValues[`svc_${d.idx}`] = 0 })
    setValues(resetValues)
    setSubmitted(false)
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold">🎛 Redistribuir</h2>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded ${badge.bg} text-white`}>{badge.label}</span>
          <button
            onClick={() => setShowSummary(!showSummary)}
            className="text-xs text-gray-400 hover:text-white px-3 py-1 rounded border border-gray-700 hover:border-gray-500 transition"
          >
            {showSummary ? 'Ocultar' : 'Resumen'}
          </button>
        </div>
      </div>
      <p className="text-gray-400 text-sm mb-4">
        Quita de la politica y dale a los servicios que protegen este pais.
      </p>

      {showSummary && (
        <div className="mb-4 p-3 bg-gray-800 rounded-lg border border-gray-700 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Impacto</span>
            <span className={`font-bold ${impact.color}`}>{impact.emoji} {impact.label}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Redirigido</span>
            <span className="font-bold text-yellow-400">{totalRedirected.toLocaleString()} M€</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">% de politica</span>
            <span className="font-bold text-white">{pctOfPoliticians.toFixed(1)}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Puntos</span>
            <span className="font-bold text-green-400">{points} pts</span>
          </div>
          {pctOfPoliticians > 0 && (
            <div>
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${pctOfPoliticians > 50 ? 'bg-red-500' : pctOfPoliticians > 20 ? 'bg-yellow-500' : 'bg-green-500'}`}
                  style={{ width: `${Math.min(pctOfPoliticians, 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Progres game bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Progreso</span>
          <span>{pctOfPoliticians.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden relative">
          <div
            className="h-full rounded-full transition-all duration-300 bg-gradient-to-r from-red-600 via-yellow-500 to-green-500"
            style={{ width: `${Math.min(pctOfPoliticians, 100)}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-white drop-shadow">{points} pts</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-xs font-bold text-red-400 mb-2 uppercase tracking-wider">🔴 Quitar de Politica</h3>
          {politicianIndices.map((d) => {
            const key = `pol_${d.idx}`
            const range = getSliderRange(values[key] || 0, d.amount)
            return (
              <div key={d.idx} className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300 text-sm">{d.category}</span>
                  <span className="text-red-400 font-mono text-sm">−{(values[key] || 0).toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={range.min}
                  max={range.max}
                  step={range.step}
                  value={values[key] || 0}
                  onChange={(e) => handleChange(key, Number(e.target.value))}
                  className="w-full accent-red-500"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-0.5">
                  <span>0</span>
                  <span>{d.amount.toLocaleString()} M€ ({d.pct}%)</span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="border-t border-gray-800 pt-3">
          <h3 className="text-xs font-bold text-green-400 mb-2 uppercase tracking-wider">🟢 Añadir a Servicios</h3>
          {serviceIndices.map((d) => {
            const key = `svc_${d.idx}`
            const maxVal = d.amount + totalRedirected
            const range = getSliderRange(values[key] || 0, maxVal)
            return (
              <div key={d.idx} className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300 text-sm">{d.category}</span>
                  <span className="text-green-400 font-mono text-sm">+{(values[key] || 0).toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={range.min}
                  max={range.max}
                  step={range.step}
                  value={values[key] || 0}
                  onChange={(e) => handleChange(key, Number(e.target.value))}
                  className="w-full accent-green-500"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-0.5">
                  <span>0</span>
                  <span>{d.amount.toLocaleString()} M€ actual</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={handleSubmit}
          className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded-lg text-sm transition"
        >
          📊 Enviar redistribución
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold rounded-lg text-sm transition border border-gray-700"
        >
          Restablecer
        </button>
      </div>

      {submitted && (
        <div className="mt-3 p-3 bg-green-900/30 border border-green-700 rounded-lg text-center">
          <div className="text-green-400 font-bold">✅ Distribucion enviada!</div>
          <div className="text-xs text-gray-400 mt-1">{points} puntos — {badge.label}</div>
        </div>
      )}
    </div>
  )
}