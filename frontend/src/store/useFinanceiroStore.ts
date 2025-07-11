import { create } from "zustand";
import { buscarResumoFinanceiro, CategoriaDespesa, CustoPorCliente } from "@/services/financeiro/financeiroService";

interface FiltrosFinanceiros {
  cliente: string;
  periodo: "atual" | "anterior" | "ultimos3";
}

interface DadosFinanceiros {
  receita: number;
  despesa: number;
  lucro: number;
  custoPorCliente: CustoPorCliente[];
  categorias: CategoriaDespesa[];
  despesaFixa: number;
  despesaVariavel: number;
}

interface FinanceiroStore {
  filtros: FiltrosFinanceiros;
  dados: DadosFinanceiros;
  atualizarCampo: (campo: keyof FiltrosFinanceiros, valor: string) => void;
  carregarResumo: (filtros: FiltrosFinanceiros) => Promise<void>;
}

export const useFinanceiroStore = create<FinanceiroStore>((set, get) => ({
  filtros: {
    cliente: "",
    periodo: "atual"
  },
  dados: {
    receita: 0,
    despesa: 0,
    lucro: 0,
    custoPorCliente: [],
    categorias: [],
    despesaFixa: 0,
    despesaVariavel: 0
  },
  atualizarCampo: (campo, valor) => {
    set((state) => ({
      filtros: { ...state.filtros, [campo]: valor }
    }));
  },
  carregarResumo: async (filtros) => {
    try {
      const [base, fixa, variavel] = await Promise.all([
        buscarResumoFinanceiro(filtros),
        buscarResumoFinanceiro({ ...filtros, tipoDespesa: "fixa" }),
        buscarResumoFinanceiro({ ...filtros, tipoDespesa: "variavel" })
      ]);

      set({
        dados: {
          receita: base.receita || 0,
          despesa: base.despesa || 0,
          lucro: base.lucro || 0,
          custoPorCliente: base.custoPorCliente || [],
          categorias: base.categorias || [],
          despesaFixa: fixa.despesa || 0,
          despesaVariavel: variavel.despesa || 0
        }
      });
    } catch (error) {
      console.error("Erro ao carregar resumo financeiro:", error);
    }
  }
}));
