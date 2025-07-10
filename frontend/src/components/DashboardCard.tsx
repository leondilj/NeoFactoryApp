type Props = {
  title: string;
  value: string | number;
  subtitle?: string;
};

export default function DashboardCard({ title, value, subtitle }: Props) {
  return (
    <div className="bg-white p-4 shadow-md rounded-xl w-full">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-semibold">{value}</p>
      {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
    </div>
  );
}