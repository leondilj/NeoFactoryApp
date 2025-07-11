using Microsoft.AspNetCore.Mvc;
using FinanceAPI.Data;

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
        // 1. Dados mockados (mantido igual)
        var receitas = MockData.Receitas();
        var despesas = MockData.Despesas();

        // 2. Calcular data de corte conforme o período
        DateTime dataInicio = periodo switch
        {
            "atual" => new DateTime(DateTime.Today.Year, DateTime.Today.Month, 1),
            "anterior" => new DateTime(DateTime.Today.Year, DateTime.Today.Month, 1).AddMonths(-1),
            "ultimos3" => DateTime.Today.AddMonths(-3),
            _ => DateTime.Today.AddMonths(-1)
        };

        // 3. Aplicar filtros compartilhados
        var receitasFiltradas = receitas.Where(r => r.Data >= dataInicio).ToList();
        var despesasFiltradas = despesas.Where(d => d.Data >= dataInicio).ToList();

        if (!string.IsNullOrEmpty(cliente))
        {
            receitasFiltradas = receitasFiltradas.Where(r => r.Cliente == cliente).ToList();
            despesasFiltradas = despesasFiltradas.Where(d => d.Cliente == cliente).ToList();
        }

        // 4. Calcular totais (desconsidera tipoDespesa)
        decimal totalReceita = receitasFiltradas.Sum(r => r.Valor);
        decimal totalDespesa = despesasFiltradas.Sum(d => d.Valor);
        decimal lucro = totalReceita - totalDespesa;

        // 5. Aplicar tipoDespesa só nos gráficos
        var despesasParaGraficos = !string.IsNullOrEmpty(tipoDespesa)
            ? despesasFiltradas.Where(d => d.Tipo == tipoDespesa).ToList()
            : despesasFiltradas;

        // 6. Custo por cliente
        var custoPorCliente = string.IsNullOrEmpty(cliente)
            ? despesasParaGraficos
                .GroupBy(d => d.Cliente)
                .Select(g => new { Cliente = g.Key, Custo = g.Sum(x => x.Valor) })
                .ToList<object>()
            : new List<object> {
                new { Cliente = cliente, Custo = despesasParaGraficos.Sum(d => d.Valor) }
            };

        // 7. Composição por categoria
        var categoriasResumo = despesasParaGraficos
            .GroupBy(d => d.Categoria)
            .Select(g => new {
                Categoria = g.Key ?? "Outros",
                Total = g.Sum(d => d.Valor)
            }).ToList();

        // 8. Retorno
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
