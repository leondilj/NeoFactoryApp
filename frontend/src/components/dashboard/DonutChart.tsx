import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { buscarResumoFinanceiro } from "@/services/financeiro/financeiroService";
import { useFinanceiroStore } from "@/store/useFinanceiroStore";

const cores = ["#10b981", "#f59e0b"]; // verde (fixa), amarelo (variável)

export default function DonutChart() {
  const { filtros } = useFinanceiroStore();
  const [fixa, setFixa] = useState(0);
  const [variavel, setVariavel] = useState(0);

  useEffect(() => {
    buscarResumoFinanceiro({ ...filtros, tipoDespesa: "fixa" }).then((d) =>
      setFixa(d.despesa)
    );

    buscarResumoFinanceiro({ ...filtros, tipoDespesa: "variavel" }).then((d) =>
      setVariavel(d.despesa)
    );
  }, [filtros]);

  const total = fixa + variavel;

  const data = [
    { name: "Fixa", value: fixa },
    { name: "Variável", value: variavel },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Distribuição de Despesas – {filtros.cliente || "Todos"}
      </h3>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Donut Chart */}
        <div className="relative w-full max-w-xs h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `R$ ${(value as number).toFixed(2)}`} />
            </PieChart>
          </ResponsiveContainer>
          {/* Valor total no centro */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-xl font-semibold text-gray-800">
              R$ {total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Legenda customizada */}
        <div className="space-y-2 w-full max-w-sm">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: cores[index % cores.length] }}
                />
                <span className="text-sm text-gray-700">{item.name}</span>
              </div>
              <span className="text-sm font-medium text-gray-800">
                R$ {item.value.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
