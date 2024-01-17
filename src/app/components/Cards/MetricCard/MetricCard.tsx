import { Card } from '../Base';

interface MetricCardProps {
  title: string;
  metric: string;
}

export default function MetricCard({ title, metric }: MetricCardProps) {
  return (
    <Card
      className="flex min-w-72 max-w-fit flex-row justify-between p-5"
      withShadow
    >
      <div>
        <p className="text-sm text-light-grey">{title}</p>
        <h3 className="text-3xl font-semibold">{metric}</h3>
      </div>
      <div className="ml-5"></div>
    </Card>
  );
}
