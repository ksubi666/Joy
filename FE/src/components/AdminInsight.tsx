import { useEffect, useState } from 'react';
import InsightCard from './InsightCard';
import { axiosInstance } from '@/lib/axios';
import _ from 'lodash';
import { format } from 'date-fns';
import { InsightChart } from './InsigthChart';
import { StarRating } from './StartRating';
import Image from 'next/image';

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
  review: string;
  productId: { _id: string; image: string; name: string };
}
interface Order {
  status: string;
  userId: { name: string };
  phone: string;
  date: string;
  createdDate: string;
  time: string;
  orderNumber: string;
}

interface ReviewsGrouped {
  [key: string]: Review[];
}

const AdminInsight = ({ orders }: { orders: Order[] }) => {
  const d = new Date();
  const monthName = month[d.getMonth()];
  const lastMonthName = month[d.getMonth() - 1] || month[11];

  const [reviews, setReviews] = useState<ReviewsGrouped>({});
  const [review, setReview] = useState<Review[]>([]);

  useEffect(() => {
    const getReviews = async () => {
      const { data } = await axiosInstance.get<Review[]>('/review/getReviews');
      const groupedReviews = _.groupBy(data, (review) => {
        return format(new Date(review.createdAt), 'MMMM');
      });
      setReviews(groupedReviews);
      setReview(data);
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
          <InsightCard
            title="Order"
            count={orders.length.toString()}
            percent=""
          />
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
      <div className="flex flex-col gap-2 rounded-lg border-[1px] h-full overflow-auto">
        {review.map((el) => (
          <div className="p-5 flex justify-between border-b-[1px] last:border-0 items-center">
            <div className="flex gap-5 items-center">
              <div className="relative w-[80px] h-[80px] rounded-lg overflow-hidden">
                <Image
                  fill
                  src={`https://pub-085cb38b95fb4b51936e3f399499e3cd.r2.dev/joy/${el.productId.image[0]}`}
                  objectFit="cover"
                  objectPosition="center"
                  alt="img"
                />
              </div>
              <div className="w-[250px] font-medium">{el.productId.name}</div>
            </div>
            <div className="flex justify-between w-[250px]">
              "{el.review}"
              <StarRating rating={Number(el.rating)} />
            </div>
            <p className="text-end">{el.createdAt.slice(0, 10)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminInsight;
