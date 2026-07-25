'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { budgetData } from '@/data/budgets'

interface Props {
  data: { category: string; amount: number; pct: number }[]
}

export default function BudgetChart({ data }: Props) {
  const chartData = [...data]
    .sort((a, b) => b.amount - a.amount)
    .map((d) => ({
      name: d.category.length > 20 ? d.category.slice(0, 18) + '…' : d.category,
      amount: d.amount,
      fullName: d.category,
      isPolitician: /político|asesor|gabinete|administración general|corporativos/i.test(d.category),
      isService: /bombero|sanidad|educación|seguridad|interior|protección civil|emergencias/i.test(d.category),
    }))

  const getColor = (isPolitician: boolean, isService: boolean) => {
    if (isPolitician) return '#ef4444'
    if (isService) return '#22c55e'
    return '#6b7280'
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <h2 className="text-xl font-semibold mb-4">📊 Desglose</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} layout="vertical" margin={{ left: 120, right: 20, top: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
          <XAxis type="number" stroke="#6b7280" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
          <YAxis type="category" dataKey="name" stroke="#9ca3af" width={115} fontSize={11} />
          <Tooltip
            contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px' }}
            formatter={(value: number) => [`${value.toLocaleString()} M€`, 'Presupuesto']}
            labelFormatter={(label) => label}
          />
          <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={index} fill={getColor(entry.isPolitician, entry.isService)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="flex gap-4 justify-center mt-3 text-xs">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-red-500 rounded" /> Política
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-green-500 rounded" /> Servicios
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-gray-500 rounded" /> Otros
        </span>
      </div>
    </div>
  )
}