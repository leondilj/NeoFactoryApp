import { Despesa } from "@/services/api";

type Props = {
  despesas: Despesa[];
};

export default function KpiCards({ despesas }: Props) {
  const totalDespesas = despesas.reduce((sum, d) => sum + d.valor, 0);

  const receitaFixa = 25000; // Simulado por enquanto
  const lucro = receitaFixa - totalDespesas;

  const formatar = (valor: number) =>
    valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-sm text-gray-500">Receita</h2>
        <p className="text-2xl font-bold text-green-600">{formatar(receitaFixa)}</p>
      </div>
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-sm text-gray-500">Despesas</h2>
        <p className="text-2xl font-bold text-red-600">{formatar(totalDespesas)}</p>
      </div>
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-sm text-gray-500">Lucro</h2>
        <p className={`text-2xl font-bold ${lucro >= 0 ? "text-blue-600" : "text-red-600"}`}>
          {formatar(lucro)}
        </p>
      </div>
    </div>
  );
}
