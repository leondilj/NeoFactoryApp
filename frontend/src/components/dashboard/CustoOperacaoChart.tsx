import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import { useFinanceiroStore } from "@/store/useFinanceiroStore";

export default function CustoOperacaoChart() {
  const { dados } = useFinanceiroStore();
  const data = dados.custoPorCliente || [];

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-md w-full">
      <h2 className="text-base md:text-lg font-semibold mb-4">Custo médio por operação</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 10, bottom: 20 }}>
          <XAxis dataKey="cliente" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="custo" fill="#10b981">
            <LabelList
              dataKey="custo"
              position="top"
              formatter={(label) => {
                const num = typeof label === "number" ? label : Number(label);
                return isNaN(num) ? "" : `R$ ${num.toFixed(2)}`;
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
