import { useEffect, useState } from "react";
import { buscarResumoFinanceiro } from "@/services/financeiro";
import { ResumoFinanceiro } from "@/models/ResumoFinanceiro";

export default function DashboardFinanceiro() {
  const [dados, setDados] = useState<ResumoFinanceiro>({ receita: 0, despesa: 0, lucro: 0 });
  const [cliente, setCliente] = useState<string>("");
  const [tipoDespesa, setTipoDespesa] = useState<string>("");
  const [periodo, setPeriodo] = useState<string>("atual");

  const carregar = () => {
    buscarResumoFinanceiro({ cliente, tipoDespesa, periodo }).then(resumo => {
      setDados(resumo);
    });
  };

  useEffect(() => {
    carregar();
    const interval = setInterval(carregar, 30000);
    return () => clearInterval(interval);
  }, [cliente, tipoDespesa, periodo]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Resumo Financeiro</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <label htmlFor="cliente-select" className="block text-sm font-medium text-gray-700">Cliente:</label>
          <select
            id="cliente-select"
            value={cliente}
            onChange={e => setCliente(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">Todos</option>
            <option value="Localiza">Localiza</option>
            <option value="Unidas">Unidas</option>
            <option value="Zannepar">Zannepar</option>
            <option value="JBS">JBS</option>
          </select>
        </div>

        <div className="flex-1">
          <label htmlFor="tipo-despesa-select" className="block text-sm font-medium text-gray-700">Tipo de Despesa:</label>
          <select
            id="tipo-despesa-select"
            value={tipoDespesa}
            onChange={e => setTipoDespesa(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">Todas</option>
            <option value="fixa">Fixa</option>
            <option value="variavel">Variável</option>
          </select>
        </div>

        <div className="flex-1">
          <label htmlFor="periodo-select" className="block text-sm font-medium text-gray-700">Período:</label>
          <select
            id="periodo-select"
            value={periodo}
            onChange={e => setPeriodo(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="atual">Mês Atual</option>
            <option value="anterior">Último Mês</option>
            <option value="ultimos3">Últimos 3 Meses</option>
          </select>
        </div>
      </div>

      <div className="space-y-2 text-lg">
        <p><strong>Receita:</strong> R$ {dados.receita.toFixed(2)}</p>
        <p><strong>Despesa:</strong> R$ {dados.despesa.toFixed(2)}</p>
        <p><strong>Lucro:</strong> R$ {dados.lucro.toFixed(2)}</p>
      </div>
    </div>
  );
}