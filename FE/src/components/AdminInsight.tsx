import InsightCard from './InsightCard';
import { InsightChart } from './InsigthChart';

const AdminInsight = () => {
  return (
    <div className="w-full h-[850px] p-5 flex flex-col gap-5">
      <div className="flex gap-5 h-fit">
        <div className="grid grid-rows-3 min-h-[150px] w-[calc(50%)] gap-5">
          <InsightCard title="Order" count="100" />
          <InsightCard title="Review" count="200" />
          <InsightCard title="Rating" count="1000" />
        </div>
        <div className="w-full rounded-lg border-[1px]">
          <InsightChart />
        </div>
      </div>
    </div>
  );
};

export default AdminInsight;
