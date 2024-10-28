interface StarRatingProps {
  rating: number;
}
export const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const stars = Array(5)
    .fill(0)
    .map((_, index) => (
      <span key={index} className="text-yellow-500">
        {index < Math.round(rating) ? '★' : '☆'}
      </span>
    ));

  return <div className="flex">{stars}</div>;
};
