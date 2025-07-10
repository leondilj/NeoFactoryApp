import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { buscarResumoFinanceiro } from "@/services/financeiro";

interface Props {
  cliente: string;
  periodo?: string;
}

export default function DonutChart({ cliente, periodo = "atual" }: Props) {
  const [fixa, setFixa] = useState(0);
  const [variavel, setVariavel] = useState(0);

  useEffect(() => {
    if (!cliente) return;

    buscarResumoFinanceiro({ cliente, tipoDespesa: "fixa", periodo }).then(d => setFixa(d.despesa));
    buscarResumoFinanceiro({ cliente, tipoDespesa: "variavel", periodo }).then(d => setVariavel(d.despesa));
  }, [cliente, periodo]);

  const data = [
    { name: "Fixa", value: fixa },
    { name: "Variável", value: variavel }
  ];

  const cores = ["#10b981", "#f59e0b"]; // verde e amarelo

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Distribuição de Despesas - {cliente}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
