import { useEffect, useState } from "react";
import { buscarResumoFinanceiro } from "@/services/financeiro";
import { ResumoFinanceiro } from "@/models/ResumoFinanceiro";
import KpiCard from "./KpiCard";


interface Props {
  cliente: string;
  periodo?: string;
}

export default function ClienteResumo({ cliente, periodo = "atual" }: Props) {
  const [dados, setDados] = useState<ResumoFinanceiro>({ receita: 0, despesa: 0, lucro: 0 });

  useEffect(() => {
    if (!cliente) return;
    buscarResumoFinanceiro({ cliente, periodo }).then(setDados);
  }, [cliente, periodo]);

  return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard
          titulo="Receita"
          valor={dados.receita}
          corFundo="bg-green-100"
          corTexto="text-green-700"
        />
        <KpiCard
          titulo="Despesa"
          valor={dados.despesa}
          corFundo="bg-red-100"
          corTexto="text-red-700"
        />
        <KpiCard
          titulo="Lucro"
          valor={dados.lucro}
          corFundo="bg-blue-100"
          corTexto="text-blue-700"
        />
      </div>
  );
}
