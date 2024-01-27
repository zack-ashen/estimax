import Divider from '@/app/components/Divider/Divider';
import QuoteManagerFilterBar from '@/app/components/FilterBar/QuoteManagerFilterBar/QuoteManagerFilterBar';

export default function QuoteManagerPage() {
  return (
    <div className="mx-auto max-w-screen-lg">
      <h3 className="SectionHeader">Quote Manager</h3>
      <Divider className="mb-7 mt-3" />
      <QuoteManagerFilterBar />
    </div>
  );
}
