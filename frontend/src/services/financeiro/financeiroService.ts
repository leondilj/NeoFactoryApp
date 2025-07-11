import { ResumoFinanceiro } from "@/interfaces/ResumoFinanceiro";

export interface CategoriaDespesa {
  categoria: string;
  total: number;
}

export interface CustoPorCliente {
  cliente: string;
  custo: number;
}

export interface ResumoFinanceiroComCategorias extends ResumoFinanceiro {
  categorias: CategoriaDespesa[];
  custoPorCliente: CustoPorCliente[]; // novo campo
}

const API_BASE = import.meta.env.VITE_API_URL || "/api";

export async function buscarResumoFinanceiro(filtros: {
  cliente?: string;
  tipoDespesa?: string;
  periodo?: string;
}): Promise<ResumoFinanceiroComCategorias> {
  const params = new URLSearchParams();
  if (filtros.cliente) params.append("cliente", filtros.cliente);
  if (filtros.tipoDespesa) params.append("tipoDespesa", filtros.tipoDespesa);
  if (filtros.periodo) params.append("periodo", filtros.periodo);

  const response = await fetch(`${API_BASE}/dashboard/financeiro?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar resumo financeiro");
  }

  return response.json();
}