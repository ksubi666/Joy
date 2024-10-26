'use client';
import Cart from '@/components/Cart';
import { axiosInstance } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import SubtotalSection from '@/components/SubTotalSection';
import { formatPrice } from '@/components/Card';

interface Product {
  ProductId: {
    categoryId: string[];
    name: string;
    price: string;
    _id: string;
    image: string;
  };
}

interface Category {
  _id: string;
  name: string;
}

interface Review {
  _id: string;
  productId: { _id: string };
  createdAt: string;
  rating: number;
  review: string;
}

const Page = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Record<string, Category[]>>({});
  const [reviews, setReviews] = useState<Review[]>([]);

  const cartId = localStorage.getItem('cartId');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchCartItems(), fetchCategories(), getReviews()]);

      if (cartId) {
        router.push(`/cart?id=${cartId}`);
      }
    };

    fetchData();
  }, [cartId, router]);

  const getReviews = async () => {
    const { data } = await axiosInstance.get<Review[]>('/review/getReviews');
    setReviews(data);
  };

  const fetchCartItems = async () => {
    if (!cartId) return;
    try {
      const { data } = await axiosInstance.get(`/cart/getCart/${cartId}`);
      setCart(data.products);
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
    }
  };

  const fetchCategories = async () => {
    const { data } = await axiosInstance.get('/category/getCategories');
    setCategories(_.groupBy(data, '_id'));
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.ProductId.price);
      return total + (isNaN(price) ? 0 : price);
    }, 0);
  };

  const calculateAverageRating = (productId: string) => {
    const productReviews = reviews.filter(
      (review) => review.productId._id === productId
    );
    const totalRating = productReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return productReviews.length > 0
      ? (totalRating / productReviews.length).toFixed(1)
      : '0';
  };

  const currentReview = (productId: string) => {
    const productReviews = reviews.filter(
      (review) => review.productId._id === productId
    );
    return productReviews.length;
  };

  const renderCartItems = () => {
    return cart.map((el) => (
      <Cart
        id={el.ProductId._id}
        key={el.ProductId.name}
        image={el.ProductId.image[0]}
        category={
          categories[el.ProductId.categoryId[0]]?.[0]?.name || 'Unknown'
        }
        title={el.ProductId.name}
        rating={calculateAverageRating(el.ProductId._id)}
        price={formatPrice(Number(el.ProductId.price))}
        comment={currentReview(el.ProductId._id)}
      />
    ));
  };

  return (
    <div className="max-w-[1440px] px-[120px] mx-auto flex flex-col gap-5 pt-7 pb-20 h-fit">
      <h1 className="text-[25px] font-bold">Shopping cart</h1>
      {renderCartItems()}
      <SubtotalSection totalPrice={formatPrice(calculateTotalPrice())} />
    </div>
  );
};

export default Page;
