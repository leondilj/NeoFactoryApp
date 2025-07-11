import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useFinanceiroStore } from "@/store/useFinanceiroStore";

export default function ResumoFinanceiroGrafico() {
  const { dados } = useFinanceiroStore();

  const data = [
    { nome: "Receita", valor: dados.receita },
    { nome: "Despesa", valor: dados.despesa },
    { nome: "Lucro", valor: dados.lucro }
  ];

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2">Gráfico Financeiro</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nome" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="valor" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}