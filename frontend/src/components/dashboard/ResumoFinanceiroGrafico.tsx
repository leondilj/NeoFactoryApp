import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { buscarResumoFinanceiro } from "@/services/financeiro";
import { ResumoFinanceiro } from "@/models/ResumoFinanceiro";

interface Props {
  cliente: string;
  periodo?: string;
}

export default function ResumoFinanceiroGrafico({ cliente, periodo = "atual" }: Props) {
  const [dados, setDados] = useState<ResumoFinanceiro>({ receita: 0, despesa: 0, lucro: 0 });

  useEffect(() => {
    buscarResumoFinanceiro({ cliente, periodo }).then(setDados);
  }, [cliente, periodo]);

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