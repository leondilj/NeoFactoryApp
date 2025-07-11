import { useFinanceiroStore } from "@/store/useFinanceiroStore";
import KpiCard from "./KpiCard";

export default function ClienteResumo() {
  const { dados } = useFinanceiroStore();

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