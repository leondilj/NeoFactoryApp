import { Despesa } from "@/models/Despesa";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

export async function buscarDespesas(filtros: {
  cliente?: string;
  tipo?: string;
  periodo?: string;
}): Promise<Despesa[]> {
  const params = new URLSearchParams();
  if (filtros.cliente) params.append("cliente", filtros.cliente);
  if (filtros.tipo) params.append("tipo", filtros.tipo);
  if (filtros.periodo) params.append("periodo", filtros.periodo);

  const response = await fetch(`${API_BASE}/despesas?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar despesas");
  }

  return response.json();
}
