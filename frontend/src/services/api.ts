const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"; // fallback local

export async function buscarDespesas(filtros: { cliente?: string; tipo?: string; periodo?: string }) {
  const params = new URLSearchParams();
  if (filtros.cliente) params.append("cliente", filtros.cliente);
  if (filtros.tipo) params.append("tipo", filtros.tipo);
  if (filtros.periodo) params.append("periodo", filtros.periodo);

  const response = await fetch(`${API_BASE}/despesas?${params.toString()}`);
  return await response.json();
}
