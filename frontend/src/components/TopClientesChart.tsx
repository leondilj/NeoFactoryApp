import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { nome: "Localiza", margem: 5400 },
  { nome: "Unidas", margem: 4200 },
  { nome: "Ampla", margem: 3100 },
  { nome: "Volvo", margem: 4500 },
  { nome: "Zannepar", margem: 1900 },
];

export default function TopClientesChart() {
  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-md w-full">
      <h2 className="text-base md:text-lg font-semibold mb-2">
        Clientes mais lucrativos
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} layout="vertical" margin={{ top: 10, bottom: 20 }}>
          <XAxis type="number" tick={{ fontSize: 12 }} />
          <YAxis type="category" dataKey="nome" tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="margem" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
