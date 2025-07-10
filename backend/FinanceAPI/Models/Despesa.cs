namespace FinanceAPI.Models;

public class Despesa
{
    public int Id { get; set; }
    public string Cliente { get; set; } = string.Empty;
    public string Tipo { get; set; } = string.Empty;
    public decimal Valor { get; set; }
    public DateTime Data { get; set; }
}
