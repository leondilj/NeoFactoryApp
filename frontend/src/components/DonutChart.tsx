import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Localiza", value: 10051.42, color: "#a855f7" },
  { name: "Unidas", value: 3000, color: "#d97706" },
  { name: "Volvo", value: 600.67, color: "#06b6d4" },
  { name: "Zannepar", value: 2002.40, color: "#a855f7" },
  { name: "JBS", value: 1051.02, color: "#a855f7" },
];

const total = data.reduce((sum, item) => sum + item.value, 0);

export default function DonutChart() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 text-white bg-gray-900 p-6 rounded-xl">
      {/* Gráfico */}
      <div className="w-full max-w-[300px] h-[300px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={80}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-lg font-semibold">R$ {total.toFixed(2)}</p>
          <p className="text-sm text-gray-400">Total</p>
        </div>
      </div>

      {/* Legenda personalizada */}
      <div>
        <h2 className="text-lg font-bold mb-4">Receitas por Clientes</h2>
        <ul className="space-y-3">
          {data.map((item, index) => {
            const percent = ((item.value / total) * 100).toFixed(2);
            return (
              <li key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <div>
                    <p className="text-sm">{item.name}</p>
                    <p className="text-xs text-gray-400">{percent}%</p>
                  </div>
                </div>
                <span className="text-green-400 text-sm font-medium">
                  R$ {item.value.toFixed(2)}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}