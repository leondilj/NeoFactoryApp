using Microsoft.AspNetCore.Mvc;
using FinanceAPI.Models;

namespace FinanceAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{

    [HttpGet("financeiro")]
    public IActionResult GetResumo(
        [FromQuery] string periodo = "atual",
        [FromQuery] string? cliente = null,
        [FromQuery] string? tipoDespesa = null)
    {
        // 1. Mock de dados
        var receitas = new List<Receita>
        {
            // --- MÊS ATUAL ---
            new Receita { Valor = 10000, Data = DateTime.Today.AddDays(-10), Cliente = "Localiza" },
            new Receita { Valor = 8500,  Data = DateTime.Today.AddDays(-3),  Cliente = "Localiza" },
            new Receita { Valor = 12000, Data = DateTime.Today.AddDays(-5),  Cliente = "JBS" },
            new Receita { Valor = 11000, Data = DateTime.Today.AddDays(-1),  Cliente = "JBS" },
            new Receita { Valor = 25000, Data = DateTime.Today.AddDays(-8),  Cliente = "Zannepar" },
            new Receita { Valor = 27000, Data = DateTime.Today.AddDays(-2),  Cliente = "Zannepar" },
            new Receita { Valor = 14000, Data = DateTime.Today.AddDays(-7),  Cliente = "Unidas" },
            new Receita { Valor = 16000, Data = DateTime.Today.AddDays(-4),  Cliente = "Unidas" },

            // --- MÊS ANTERIOR ---
            new Receita { Valor = 9200,  Data = DateTime.Today.AddMonths(-1).AddDays(-2), Cliente = "Localiza" },
            new Receita { Valor = 9800,  Data = DateTime.Today.AddMonths(-1), Cliente = "JBS" },
            new Receita { Valor = 15000, Data = DateTime.Today.AddMonths(-1), Cliente = "Unidas" },

            // --- ÚLTIMOS 3 MESES (EXCLUINDO ATUAL E ANTERIOR) ---
            new Receita { Valor = 20000, Data = DateTime.Today.AddMonths(-2), Cliente = "Zannepar" },
            new Receita { Valor = 19500, Data = DateTime.Today.AddMonths(-2).AddDays(3), Cliente = "Unidas" },
            new Receita { Valor = 18500, Data = DateTime.Today.AddMonths(-3).AddDays(2), Cliente = "Zannepar" },

            // --- FORA DOS FILTROS (ANTIGO) ---
            new Receita { Valor = 21200, Data = DateTime.Today.AddMonths(-4), Cliente = "JBS" }
        };

        var despesas = new List<Despesa>
        {
            // --- MÊS ATUAL ---
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

            // --- MÊS ANTERIOR ---
            new Despesa { Valor = 1200, Data = DateTime.Today.AddDays(-10),Tipo = "fixa",      Cliente = "Unidas", Categoria = "Serviços Terceiros" },
            new Despesa { Valor = 3000, Data = DateTime.Today.AddMonths(-1), Tipo = "fixa",    Cliente = "JBS", Categoria = "Aluguel" },

            // --- ÚLTIMOS 3 MESES ---
            new Despesa { Valor = 900, Data = DateTime.Today.AddMonths(-2).AddDays(6), Tipo = "fixa", Cliente = "Localiza", Categoria = "Licenciamento" },
            new Despesa { Valor = 1100, Data = DateTime.Today.AddMonths(-3).AddDays(1), Tipo = "variavel", Cliente = "JBS", Categoria = "Transporte" },

            // --- FORA DOS FILTROS ---
            new Despesa { Valor = 2200, Data = DateTime.Today.AddMonths(-4), Tipo = "variavel", Cliente = "Unidas", Categoria = "Outros" },
            new Despesa { Valor = 3000, Data = DateTime.Today.AddMonths(-4), Tipo = "viagem", Cliente = "Unidas", Categoria = "Hotel" }
        };

        // 2. Filtro por período
        DateTime dataInicio = periodo switch
        {
            "atual" => new DateTime(DateTime.Today.Year, DateTime.Today.Month, 1),
            "anterior" => new DateTime(DateTime.Today.Year, DateTime.Today.Month, 1).AddMonths(-1),
            "ultimos3" => DateTime.Today.AddMonths(-3),
            _ => DateTime.Today.AddMonths(-1)
        };

        receitas = receitas.Where(r => r.Data >= dataInicio).ToList();
        despesas = despesas.Where(d => d.Data >= dataInicio).ToList();

        // 3. Filtro por cliente
        if (!string.IsNullOrEmpty(cliente))
        {
            receitas = receitas.Where(r => r.Cliente == cliente).ToList();
            despesas = despesas.Where(d => d.Cliente == cliente).ToList();
        }

        // 4. Filtro por tipo de despesa
        if (!string.IsNullOrEmpty(tipoDespesa))
        {
            despesas = despesas.Where(d => d.Tipo == tipoDespesa).ToList();

        }

        var custoPorCliente = new List<object>();

        if (!string.IsNullOrEmpty(cliente))
        {
            var total = despesas.Where(d => d.Cliente == cliente).Sum(d => d.Valor);
            custoPorCliente = new List<object> {
                new { Cliente = cliente, Custo = total }
            };
        }
        else
        {
            custoPorCliente = despesas
                .GroupBy(d => d.Cliente)
                .Select(g => new
                {
                    Cliente = g.Key,
                    Custo = g.Sum(x => x.Valor)
                }).ToList<object>();
        }

        var categoriasResumo = despesas
            .GroupBy(d => d.Categoria)
            .Select(g => new {
                Categoria = g.Key ?? "Outros",
                Total = g.Sum(d => d.Valor)
            }).ToList();

        // 5. Resultado final
        decimal totalReceita = receitas.Sum(r => r.Valor);
        decimal totalDespesa = despesas.Sum(d => d.Valor);
        decimal lucro = totalReceita - totalDespesa;

        return Ok(new
        {
            Receita = totalReceita,
            Despesa = totalDespesa,
            Lucro = lucro,
            Categorias = categoriasResumo,
            CustoPorCliente = custoPorCliente
        });
    }
}
