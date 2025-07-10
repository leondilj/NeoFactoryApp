import { useEffect, useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList } from "recharts";
import { buscarResumoFinanceiro, CategoriaDespesa } from "@/services/financeiro";

interface Props {
  cliente: string;
  periodo?: string;
}

export default function GastosPorCategoriaChart({ cliente, periodo = "atual" }: Props) {
  const [dados, setDados] = useState<CategoriaDespesa[]>([]);

  useEffect(() => {
    if (!cliente) return;
    buscarResumoFinanceiro({ cliente, periodo }).then(res => {
      setDados(res.categorias || []);
    });
  }, [cliente, periodo]);

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h3 className="text-lg font-semibold mb-4">Gastos por Categoria</h3>

      <div className="w-full h-[300px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={dados}
            margin={{ top: 10, right: 20, left: 80, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tick={{ fontSize: 12 }} />
            <YAxis
              dataKey="categoria"
              type="category"
              width={100}
              tick={{ fontSize: 12 }}
            />
            <Tooltip />
            <Bar dataKey="total" fill="#6366f1" radius={[0, 4, 4, 0]}>
              <LabelList dataKey="total" position="right" style={{ fontSize: 12 }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
