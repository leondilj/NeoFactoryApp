using FinanceAPI.Models;

namespace FinanceAPI.Services;

public class DespesaService
{
    private static readonly List<Despesa> _despesasMock = new()
    {
        new Despesa { Id = 1, Cliente = "Cliente A", Tipo = "Operacional", Valor = 3000, Data = new DateTime(2025, 6, 10) },
        new Despesa { Id = 2, Cliente = "Cliente B", Tipo = "Marketing", Valor = 1200, Data = new DateTime(2025, 6, 12) },
        new Despesa { Id = 3, Cliente = "Cliente C", Tipo = "Fiscal", Valor = 2500, Data = new DateTime(2025, 7, 1) },
        new Despesa { Id = 4, Cliente = "Cliente A", Tipo = "Operacional", Valor = 1800, Data = new DateTime(2025, 7, 3) },
        new Despesa { Id = 5, Cliente = "Cliente B", Tipo = "Marketing", Valor = 1600, Data = new DateTime(2025, 7, 5) },
        new Despesa { Id = 6, Cliente = "Cliente C", Tipo = "Fiscal", Valor = 2700, Data = new DateTime(2025, 7, 7) }
    };

    public IEnumerable<Despesa> ObterDespesas(string? cliente, string? tipo, string? periodo)
    {
        return _despesasMock.Where(d =>
            (string.IsNullOrEmpty(cliente) || d.Cliente == cliente) &&
            (string.IsNullOrEmpty(tipo) || d.Tipo == tipo) &&
            (string.IsNullOrEmpty(periodo) || d.Data.ToString("yyyy-MM") == periodo)
        );
    }
}
