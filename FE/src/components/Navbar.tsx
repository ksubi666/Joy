'use client';
import { CircleUserRound, Heart, Search, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import logo from '../assets/JOY.png';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/lib/axios';
import _ from 'lodash';
import { formatPrice } from './Card';
interface StarRatingProps {
  rating: number;
}

const styles = {
  container:
    'max-w-[1440px] h-[70px] bg-white text-black px-[120px] flex justify-between items-center mx-auto ',
  searchInput:
    'w-[320px] h-[44px] rounded-3xl border-[#DCDFE4] border-[1px] flex items-center justify-between py-2 px-4 gap-2 relative',
  subContainer: 'flex items-center gap-10',
};

interface Product {
  _id: string;
  name: string;
  price: string;
  image: string[];
  description: string;
  discount: string;
  location: [number, number];
}

interface Review {
  productId: {
    _id: string;
  };
  rating: number;
}

const Navbar = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<{ [key: string]: Review[] }>({});
  const [text, setText] = useState('');
  const [isShow, setIsShow] = useState(false);

  const handlerClick = () => {
    setIsShow(!isShow);
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const filteredProducts = products.filter((el) =>
    el.name.toLowerCase().includes(text.toLowerCase())
  );

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await axiosInstance.get<Product[]>(
        '/product/getProducts'
      );
      setProducts(data);
    };

    const getReviews = async () => {
      const { data } = await axiosInstance.get<Review[]>('/review/getReviews');
      const groupedReviews = _.groupBy(data, (el) => el.productId._id);
      setReviews(groupedReviews);
    };

    getProducts();
    getReviews();
  }, []);

  const calculateAverageRating = (productId: string): number => {
    const ratings = reviews[productId] || [];
    if (ratings.length === 0) return 0;
    const total = ratings.reduce((sum, review) => sum + review.rating, 0);
    return parseFloat((total / ratings.length).toFixed(1));
  };

  return (
    <div className="border-b-[1px]">
      <nav className={styles.container}>
        <div className={`${styles.subContainer} gap-5`}>
          <Link
            href={`/?category=art%20Crafts`}
            className="w-[50px] h-[50px] relative"
          >
            <Image
              src={logo}
              alt="logo"
              fill
              objectFit="cover"
              objectPosition="center"
            />
          </Link>
          <div className={styles.searchInput}>
            <Search />
            <input
              type="text"
              className="w-full outline-none"
              onChange={onChangeHandler}
              onClick={handlerClick}
            />
          </div>
          {isShow && (
            <div className="absolute top-16 left-[205px] bg-white z-50 rounded-3xl w-[320px] border-[1px] max-h-[480px] overflow-auto p-4 flex flex-col gap-4">
              {filteredProducts.map((el) => (
                <div className="flex gap-2" key={el._id}>
                  <div className="relative min-w-[100px] h-[100px] rounded-lg overflow-hidden">
                    <Image
                      src={`https://pub-085cb38b95fb4b51936e3f399499e3cd.r2.dev/joy/${el.image[0]}`}
                      fill
                      objectFit="cover"
                      objectPosition="center"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col">
                    <h4>{el.name}</h4>
                    <div className="flex justify-between items-center">
                      <StarRating rating={calculateAverageRating(el._id)} />
                      <p className="font-semibold">
                        {formatPrice(Number(el.price))}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.subContainer}>
          <Link href={'/wishlist'}>
            <Heart />
          </Link>
          <Link href={'/cart'}>
            <ShoppingCart />
          </Link>
          <Link href={'/login'}>
            <CircleUserRound />
          </Link>
        </div>
      </nav>
    </div>
  );
};
const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const stars = Array(5)
    .fill(0)
    .map((_, index) => (
      <span key={index} className="text-yellow-500">
        {index < Math.round(rating) ? '★' : '☆'}
      </span>
    ));

  return <div className="flex">{stars}</div>;
};
export default Navbar;
