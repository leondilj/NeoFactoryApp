import { useEffect, useRef, useState } from "react";
import ClienteResumo from "@/components/dashboard/ClienteResumo";
import ResumoFinanceiroGrafico from "@/components/dashboard/ResumoFinanceiroGrafico";
import DonutChart from "@/components/dashboard/DonutChart";
import GastosPorCategoriaChart from "@/components/dashboard/GastosPorCategoriaChart";
import CustoOperacaoChart from "@/components/dashboard/CustoOperacaoChart";
import { Calendar, ChevronDown } from "lucide-react";
import { useFinanceiroStore } from "@/store/useFinanceiroStore";

// Função auxiliar para exibir nome legível do período
function nomePeriodo(periodo: string): string {
  switch (periodo) {
    case "atual": return "Mês Atual";
    case "anterior": return "Último Mês";
    case "ultimos3": return "Últimos 3 Meses";
    default: return "Período Desconhecido";
  }
}

export default function DashboardFinanceiro() {
  const { filtros, atualizarCampo, carregarResumo } = useFinanceiroStore();
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

    // 🔄 Carrega os dados do backend sempre que os filtros mudarem
  useEffect(() => {
    carregarResumo(filtros);
  }, [filtros]);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownAberto(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-10">

        {/* Cabeçalho */}
        <header className="space-y-2">
          <h1 className="text-2xl font-bold">Painel de Indicadores Financeiros</h1>
          <p className="text-sm text-gray-500">
            Cliente: {filtros.cliente || "Todos"}
          </p>
          <div className="text-sm inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-md shadow-sm w-fit">
            📅 Dados filtrados para: <strong>{nomePeriodo(filtros.periodo)}</strong>
          </div>
        </header>

        {/* Filtros */}
        <section className="flex flex-col md:flex-row gap-4">
          {/* Filtro Cliente */}
          <div className="flex-1">
            <label htmlFor="cliente-select" className="block mb-1 font-medium">Selecionar Cliente:</label>
            <select
              id="cliente-select"
              value={filtros.cliente}
              onChange={e => atualizarCampo("cliente", e.target.value)}
              className="w-full max-w-xs border border-gray-300 rounded-md p-2"
            >
              <option value="">Todos</option>
              <option value="Localiza">Localiza</option>
              <option value="Unidas">Unidas</option>
              <option value="Zannepar">Zannepar</option>
              <option value="JBS">JBS</option>
            </select>
          </div>

          {/* Filtro Período com botão dropdown */}
          <div className="flex-1" ref={dropdownRef}>
            <label className="block mb-1 font-medium">Período:</label>
            <button
              type="button"
              className="inline-flex items-center justify-between w-full max-w-xs border border-gray-300 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              onClick={() => setDropdownAberto(!dropdownAberto)}
            >
              <Calendar className="w-4 h-4 mr-2" />
              {nomePeriodo(filtros.periodo)}
              <ChevronDown className="w-4 h-4 ml-auto" />
            </button>

            {dropdownAberto && (
              <div className="absolute mt-1 w-full max-w-xs rounded-md bg-white shadow-lg border border-gray-200 z-10">
                <ul className="text-sm text-gray-700">
                  {["atual", "anterior", "ultimos3"].map((p) => (
                    <li key={p}>
                      <button
                        className="w-full px-4 py-2 text-left hover:bg-gray-100"
                        onClick={() => {
                          atualizarCampo("periodo", p);
                          setDropdownAberto(false);
                        }}
                      >
                        {nomePeriodo(p)}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* KPIs */}
        <section>
          <ClienteResumo />
        </section>

        {/* Gráficos principais */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ResumoFinanceiroGrafico />
          <DonutChart />
        </section>

        {/* Gráfico por categoria */}
        <section>
          <GastosPorCategoriaChart />
        </section>

        {/* Custos por Cliente */}
        <section>
          <CustoOperacaoChart />
        </section>
      </div>
    </div>
  );
}