
namespace FinanceAPI.Models;
public class Receita
{
    public int Id { get; set; }
    public DateTime Data { get; set; }
    public decimal Valor { get; set; }
    public string Cliente { get; set; } = string.Empty;
}