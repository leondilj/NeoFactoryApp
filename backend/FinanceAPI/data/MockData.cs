using FinanceAPI.Models;

namespace FinanceAPI.Data;

public static class MockData
{
    public static List<Receita> Receitas() => new List<Receita>
    {
        new Receita { Valor = 10000, Data = DateTime.Today.AddDays(-10), Cliente = "Localiza" },
        new Receita { Valor = 8500,  Data = DateTime.Today.AddDays(-3),  Cliente = "Localiza" },
        new Receita { Valor = 12000, Data = DateTime.Today.AddDays(-5),  Cliente = "JBS" },
        new Receita { Valor = 11000, Data = DateTime.Today.AddDays(-1),  Cliente = "JBS" },
        new Receita { Valor = 25000, Data = DateTime.Today.AddDays(-8),  Cliente = "Zannepar" },
        new Receita { Valor = 27000, Data = DateTime.Today.AddDays(-2),  Cliente = "Zannepar" },
        new Receita { Valor = 14000, Data = DateTime.Today.AddDays(-7),  Cliente = "Unidas" },
        new Receita { Valor = 16000, Data = DateTime.Today.AddDays(-4),  Cliente = "Unidas" },

        new Receita { Valor = 9200,  Data = DateTime.Today.AddMonths(-1).AddDays(-2), Cliente = "Localiza" },
        new Receita { Valor = 9800,  Data = DateTime.Today.AddMonths(-1), Cliente = "JBS" },
        new Receita { Valor = 15000, Data = DateTime.Today.AddMonths(-1), Cliente = "Unidas" },

        new Receita { Valor = 20000, Data = DateTime.Today.AddMonths(-2), Cliente = "Zannepar" },
        new Receita { Valor = 19500, Data = DateTime.Today.AddMonths(-2).AddDays(3), Cliente = "Unidas" },
        new Receita { Valor = 18500, Data = DateTime.Today.AddMonths(-3).AddDays(2), Cliente = "Zannepar" },

        new Receita { Valor = 21200, Data = DateTime.Today.AddMonths(-4), Cliente = "JBS" }
    };

    public static List<Despesa> Despesas() => new List<Despesa>
    {
        new Despesa { Valor = 800,  Data = DateTime.Today.AddDays(-3), Tipo = "viagem",    Cliente = "Localiza", Categoria = "Hotel" },
        new Despesa { Valor = 150,  Data = DateTime.Today.AddDays(-2), Tipo = "viagem",    Cliente = "Localiza", Categoria = "Alimentação" },
        new Despesa { Valor = 200,  Data = DateTime.Today.AddDays(-2), Tipo = "viagem",    Cliente = "Localiza", Categoria = "Gasolina" },
        new Despesa { Valor = 4000, Data = DateTime.Today.AddDays(-5), Tipo = "fixa",      Cliente = "Localiza", Categoria = "Aluguel" },

        new Despesa { Valor = 650,  Data = DateTime.Today.AddDays(-4), Tipo = "viagem",    Cliente = "Zannepar", Categoria = "Gasolina" },
        new Despesa { Valor = 500,  Data = DateTime.Today.AddDays(-4), Tipo = "viagem",    Cliente = "Zannepar", Categoria = "Manutenção Carro" },
        new Despesa { Valor = 200,  Data = DateTime.Today.AddDays(-3), Tipo = "variavel",  Cliente = "Zannepar", Categoria = "Transporte" },
        new Despesa { Valor = 1200, Data = DateTime.Today.AddDays(-5), Tipo = "fixa",      Cliente = "Zannepar", Categoria = "Serviços Terceiros" },

        new Despesa { Valor = 400,  Data = DateTime.Today.AddDays(-1), Tipo = "viagem",    Cliente = "Unidas", Categoria = "Alimentação" },
        new Despesa { Valor = 750,  Data = DateTime.Today.AddDays(-2), Tipo = "viagem",    Cliente = "Unidas", Categoria = "Hotel" },
        new Despesa { Valor = 300,  Data = DateTime.Today.AddDays(-3), Tipo = "variavel",  Cliente = "Unidas", Categoria = "Transporte" },

        new Despesa { Valor = 950,  Data = DateTime.Today.AddDays(-6), Tipo = "viagem",    Cliente = "JBS", Categoria = "Manutenção Carro" },
        new Despesa { Valor = 500,  Data = DateTime.Today.AddDays(-3), Tipo = "viagem",    Cliente = "JBS", Categoria = "Alimentação" },
        new Despesa { Valor = 1000, Data = DateTime.Today.AddDays(-5), Tipo = "viagem",    Cliente = "JBS", Categoria = "Gasolina" },

        new Despesa { Valor = 1200, Data = DateTime.Today.AddDays(-10),Tipo = "fixa",      Cliente = "Unidas", Categoria = "Serviços Terceiros" },
        new Despesa { Valor = 3000, Data = DateTime.Today.AddMonths(-1), Tipo = "fixa",    Cliente = "JBS", Categoria = "Aluguel" },

        new Despesa { Valor = 900, Data = DateTime.Today.AddMonths(-2).AddDays(6), Tipo = "fixa", Cliente = "Localiza", Categoria = "Licenciamento" },
        new Despesa { Valor = 1100, Data = DateTime.Today.AddMonths(-3).AddDays(1), Tipo = "variavel", Cliente = "JBS", Categoria = "Transporte" },

        new Despesa { Valor = 2200, Data = DateTime.Today.AddMonths(-4), Tipo = "variavel", Cliente = "Unidas", Categoria = "Outros" },
        new Despesa { Valor = 3000, Data = DateTime.Today.AddMonths(-4), Tipo = "viagem", Cliente = "Unidas", Categoria = "Hotel" }
    };
}
