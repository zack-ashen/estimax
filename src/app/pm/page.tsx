import MetricCard from '../components/Cards/MetricCard/MetricCard';

export default function PMDashboard() {
  return (
    <div className="flex flex-row justify-between">
      <MetricCard title="Properties" metric={'123'} />
      <MetricCard title="Properties" metric={'123'} />
      <MetricCard title="Properties" metric={'123'} />
    </div>
  );
}
