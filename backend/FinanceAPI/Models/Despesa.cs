namespace FinanceAPI.Models;

public class Despesa
{
    public int Id { get; set; }
    public decimal Valor { get; set; }
    public DateTime Data { get; set; }
    public string Tipo { get; set; } = string.Empty; // fixa, variavel, viagem
    public string Cliente { get; set; } = string.Empty;
    public string? Categoria { get; set; } // nova propriedade (ex: hotel, gasolina, etc.)
}

