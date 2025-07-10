using Microsoft.AspNetCore.Mvc;
using FinanceAPI.Models;
using FinanceAPI.Services;

namespace FinanceAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DespesasController : ControllerBase
{
    private readonly DespesaService _service;

    public DespesasController(DespesaService service)
    {
        _service = service;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Despesa>> GetDespesas(
        [FromQuery] string? cliente,
        [FromQuery] string? tipo,
        [FromQuery] string? periodo)
    {
        var despesas = _service.ObterDespesas(cliente, tipo, periodo);
        return Ok(despesas);
    }
}
