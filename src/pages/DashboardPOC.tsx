import KpiCard from "../components/KpiCard";
import TopClientesChart from "../components/TopClientesChart";
import CustoOperacaoChart from "../components/CustoOperacaoChart";

export default function DashboardPOC() {
  const receita = 13852.10;
  const despesas = 4200.00;
  const impostos = 1052.55;
  const lucro = receita - despesas - impostos;

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen space-y-6">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">Painel Financeiro</h1>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard title="Receita Total" value={receita} />
        <KpiCard title="Despesas Totais" value={despesas} />
        <KpiCard title="Impostos Pagos" value={impostos} />
        <KpiCard title="Lucro Líquido" value={lucro} highlight />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TopClientesChart />
        <CustoOperacaoChart />
      </section>
    </div>
  );
}
