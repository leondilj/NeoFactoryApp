import { useEffect, useState } from "react";
import { buscarDespesas } from "@/services/api";
import { Despesa } from "@/models/Despesa";

export default function Dashboard() {
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    buscarDespesas({})
      .then(data => {
        setDespesas(data);
        setLoading(false);
      })
      .catch(err => {
        setErro("Erro ao carregar dados");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (erro) return <p>{erro}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Despesas</h1>
      <ul className="space-y-2">
        {despesas.map((d) => (
          <li key={d.id} className="border p-2 rounded shadow-sm">
            {d.cliente} — {d.tipo} — R$ {d.valor} — {new Date(d.data).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}