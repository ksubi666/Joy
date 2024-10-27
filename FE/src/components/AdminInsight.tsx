import { useEffect, useState } from 'react';
import InsightCard from './InsightCard';
import { axiosInstance } from '@/lib/axios';
import _ from 'lodash';
import { format } from 'date-fns';
import { InsightChart } from './InsigthChart';

const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

interface Review {
  id: string;
  createdAt: string;
  content?: string;
  rating?: number;
}

interface ReviewsGrouped {
  [key: string]: Review[];
}

const AdminInsight = () => {
  const d = new Date();
  const monthName = month[d.getMonth()];
  const lastMonthName = month[d.getMonth() - 1] || month[11];

  const [reviews, setReviews] = useState<ReviewsGrouped>({});

  useEffect(() => {
    const getReviews = async () => {
      const { data } = await axiosInstance.get<Review[]>('/review/getReviews');
      const groupedReviews = _.groupBy(data, (review) => {
        return format(new Date(review.createdAt), 'MMMM');
      });
      setReviews(groupedReviews);
    };

    getReviews();
  }, []);

  const percentageDiff = (
    currentMonthCount: number,
    lastMonthCount: number
  ) => {
    if (lastMonthCount === 0) return currentMonthCount > 0 ? 100 : 0;
    return Math.floor(
      ((currentMonthCount - lastMonthCount) / lastMonthCount) * 100
    );
  };

  return (
    <div className="w-full h-[850px] p-5 flex flex-col gap-5">
      <div className="flex gap-5 h-fit">
        <div className="grid grid-rows-3 min-h-[150px] w-[calc(50%)] gap-5">
          <InsightCard title="Order" count="100" percent="" />
          <InsightCard
            title="Review"
            count={(reviews[monthName]?.length || 0).toString()}
            percent={percentageDiff(
              reviews[monthName]?.length || 0,
              reviews[lastMonthName]?.length || 0
            ).toString()}
          />
          <InsightCard
            title="Rating"
            count={(reviews[monthName]?.length || 0).toString()}
            percent={percentageDiff(
              reviews[monthName]?.length || 0,
              reviews[lastMonthName]?.length || 0
            ).toString()}
          />
        </div>
        <div className="w-full rounded-lg border-[1px]">
          <InsightChart />
        </div>
      </div>
    </div>
  );
};

export default AdminInsight;
