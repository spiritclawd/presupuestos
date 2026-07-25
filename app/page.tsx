import BudgetSlider from '@/components/BudgetSlider'
import BudgetChart from '@/components/BudgetChart'
import { budgetData } from '@/data/budgets'

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">
          ⛑ Los presupuestos de España
        </h1>
        <p className="text-gray-400 text-lg">
          ¿Dónde va tu dinero y dónde debería ir?
        </p>
        <p className="text-gray-500 text-sm mt-2">
          PGE 2024 · {budgetData.totalPGE.toLocaleString()} M€ · Datos oficiales
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <BudgetSlider data={budgetData.national} />
        <BudgetChart data={budgetData.national} />
      </div>
    </main>
  )
}