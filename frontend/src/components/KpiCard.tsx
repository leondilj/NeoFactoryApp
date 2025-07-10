type Props = {
  title: string;
  value: number;
  highlight?: boolean;
};

export default function KpiCard({ title, value, highlight }: Props) {
  return (
    <div className={`p-4 md:p-6 rounded-xl shadow-md bg-white ${highlight ? "border-l-4 border-green-500" : ""}`}>
      <p className="text-sm md:text-base text-gray-500">{title}</p>
      <p className="text-2xl md:text-3xl font-bold text-gray-800">
        R$ {value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
      </p>
    </div>
  );
}
