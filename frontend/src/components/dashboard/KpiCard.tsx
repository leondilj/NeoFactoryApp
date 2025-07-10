interface KpiCardProps {
  titulo: string;
  valor: number;
  corFundo: string;
  corTexto: string;
}

export default function KpiCard({ titulo, valor, corFundo, corTexto }: KpiCardProps) {
  return (
    <div className={`p-4 rounded shadow ${corFundo} ${corTexto}`}>
      <p className="text-sm font-medium">{titulo}</p>
      <p className="text-xl font-bold">R$ {valor.toFixed(2)}</p>
    </div>
  );
}
