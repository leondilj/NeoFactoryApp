import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { centro: "Localiza", custo: 12503.42 },
  { centro: "Unidas", custo: 1546 },
  { centro: "Volvo", custo: 2832 },
  { centro: "JBS", custo: 8273.67 },
];

export default function CustoOperacaoChart() {
  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-md w-full">
      <h2 className="text-base md:text-lg font-semibold mb-2">
        Custo médio por operação
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 10, bottom: 20 }}>
          <XAxis dataKey="centro" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="custo" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
