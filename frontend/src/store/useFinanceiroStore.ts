import { create } from "zustand";
import { buscarResumoFinanceiro } from "@/services/financeiro/financeiroService";
import { ResumoFinanceiro } from "@/interfaces/ResumoFinanceiro";

interface Filtros {
  cliente: string;
  tipoDespesa?: string;
  periodo: string;
}

interface FinanceiroStore {
  dados: ResumoFinanceiro;
  filtros: Filtros;
  carregarResumo: (filtros: Filtros) => Promise<void>;
  atualizarCampo: (campo: keyof Filtros, valor: string) => void;
}

export const useFinanceiroStore = create<FinanceiroStore>((set) => ({
  dados: { receita: 0, despesa: 0, lucro: 0 },
  filtros: { cliente: "", periodo: "atual" },

  carregarResumo: async (filtros) => {
    const dados = await buscarResumoFinanceiro(filtros);
    set({ dados, filtros });
  },

  atualizarCampo: (campo, valor) => {
    set((state) => ({
      filtros: { ...state.filtros, [campo]: valor }
    }));
  },
}));