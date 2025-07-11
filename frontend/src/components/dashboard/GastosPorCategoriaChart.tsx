import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useFinanceiroStore } from "@/store/useFinanceiroStore";

const cores = ["#000000", "#3b82f6", "#ef4444", "#10b981", "#22c55e", "#f59e0b"];

export default function GastosPorCategoriaChart() {
  const { dados } = useFinanceiroStore();
  const categorias = dados.categorias || [];
  const valorTotal = categorias.reduce((acc, item) => acc + item.total, 0);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Composição dos Gastos</h3>

      <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-8">
        <div className="relative w-full max-w-xs h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categorias}
                dataKey="total"
                nameKey="categoria"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                label={false}
              >
                {categorias.map((_, index) => (
                  <Cell key={index} fill={cores[index % cores.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-xl font-semibold text-gray-800">
              R$ {valorTotal.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="space-y-2 w-full max-w-md">
          {categorias.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full categoria-dot"
                  style={{ backgroundColor: cores[index % cores.length] }}
                ></div>
                <span className="text-sm text-gray-700">{item.categoria}</span>
              </div>
              <span className="text-sm font-medium text-gray-800">
                R$ {item.total.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
