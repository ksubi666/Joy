import { useEffect, useRef, useState } from 'react';
import { Textarea } from './ui/textarea';
import { jwtDecode } from 'jwt-decode';
import { axiosInstance } from '@/lib/axios';
import { useSearchParams } from 'next/navigation';
import _ from 'lodash';

interface UserDoc {
  _id: string;
  name: string;
}

interface Review {
  _id: string;
  productId: { _id: string };
  userId: UserDoc;
  createdAt: string;
  rating: number;
  review: string;
}

const ReviewRating = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const searchParams = useSearchParams();
  const productId = searchParams.get('product');

  const token = document.cookie;
  const { _doc }: { _doc: UserDoc } = jwtDecode(token);
  const user = _doc;

  useEffect(() => {
    const getReviews = async () => {
      try {
        const { data } = await axiosInstance.get<Review[]>(
          '/review/getReviews'
        );
        const filteredReviews = _.filter(
          data,
          (review) => review.productId._id === productId
        );
        setReviews(filteredReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    getReviews();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formRef.current) {
      const reviewText = formRef.current[0].value;

      try {
        await axiosInstance.post('/review/create', {
          productId,
          userId: user._id,
          review: reviewText,
          rating,
        });
        location.reload();
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    }
  };

  const renderRating = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-[30px] font-bold">Write a Review</h2>
      <div className="mt-5">
        <span>Rating: </span>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{
              cursor: 'pointer',
              fontSize: '20px',
              color: star <= (rating || 0) ? 'gold' : 'gray',
            }}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>
      <form ref={formRef} onSubmit={handleSubmit}>
        <Textarea
          placeholder="Write your review here"
          className="flex flex-col justify-center border-[1px] border-solid border-slate-400 w-full rounded-lg outline-none min-h-[100px]"
          required
        />
        <button
          type="submit"
          className="bg-orange-500 rounded-xl w-fit mt-2 px-6 py-1 text-white font-semibold drop-shadow-lg text-[18px]"
        >
          Submit
        </button>
      </form>
      {reviews.length > 0 && (
        <h3 className="mt-7 text-[20px] font-semibold">Reviews:</h3>
      )}
      <div className="flex gap-3 overflow-auto">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="h-[150px] min-w-[250px] rounded-2xl border-[1px] py-5 px-8 flex flex-col gap-2"
          >
            <div className="flex gap-4 items-center">
              <div className="rounded-full bg-gray-200 size-10 flex justify-center items-center capitalize font-semibold text-white text-[22px]">
                {review.userId.name.charAt(0)}
              </div>
              <div className="flex flex-col gap-1 capitalize text-[14px] font-medium">
                <h4>{review.userId.name}</h4>
                <p className="text-gray-400">{review.createdAt.slice(0, 10)}</p>
              </div>
            </div>
            <p className="text-yellow-400">{renderRating(review.rating)}</p>
            <p>{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewRating;
