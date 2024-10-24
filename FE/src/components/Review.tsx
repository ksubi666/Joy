import { useState } from 'react';

interface Review {
  text: string;
  rating: number;
}

const ReviewRating = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [text, setText] = useState('');
  const [rating, setRating] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text && rating !== null) {
      setReviews([...reviews, { text, rating }]);
      setText('');
      setRating(null);
    }
  };

  return (
    <div>
      <h2 className='text-[30px] font-bold'>Write a Review</h2>
      <div className='mt-5'>
          <span>Rating: </span>
           {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={{ cursor: 'pointer', fontSize: '20px', color: star <= (rating || 0) ? 'gold' : 'gray' }}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your review here"
          className='flex flex-col justify-center border-[1px] border-solid border-slate-400 w-[500px] rounded-md'
          required
        />
        
        <button 
        type="submit"
        className='bg-orange-500 rounded-xl w-fit mt-2 px-6 py-1 text-white font-semibold drop-shadow-lg text-[18px]'
        >Submit</button>
      </form>

      <h3 className='mt-7 text-[20px] font-semibold'>Reviews:</h3>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            <p>{review.text}</p>
            <p>Rating: {review.rating} ★</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewRating;
