'use client';
import { useEffect, useState } from 'react';
import Card from './Card';
import { axiosInstance } from '@/lib/axios';
import { useSearchParams } from 'next/navigation';
import _ from 'lodash';

interface Category {
  name: string;
}

interface Product {
  name: string;
  price: string;
  image: string[];
  _id: string;
  categoryId: Category[];
  product: string;
}

interface Review {
  _id: string;
  productId: { _id: string };
  createdAt: string;
  rating: number;
  review: string;
}

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Record<string, Review[]>>({});
  const [filteredProduct, setFilteredProduct] = useState<Product[]>([]);
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await axiosInstance.get<Product[]>(
        '/product/getProducts'
      );
      setProducts(data);
    };
    getProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const filtered = _.filter(products, (product) =>
        product.categoryId.some((cate) => cate.name === category)
      );
      setFilteredProduct(filtered);
    }
  }, [category, products]);

  useEffect(() => {
    const getReviews = async () => {
      const { data } = await axiosInstance.get<Review[]>('/review/getReviews');
      const groupedReviews = _.groupBy(data, (el) => el.productId._id);
      setReviews(groupedReviews);
    };
    getReviews();
  }, []);

  const calculateAverageRating = (ratings: number[]): number => {
    if (ratings.length === 0) return 0;
    const total = ratings.reduce((sum, rating) => sum + rating, 0);
    return parseFloat((total / ratings.length).toFixed(1));
  };

  return (
    <div className="flex flex-wrap max-w-[1200px] mx-auto gap-[25px] mb-10">
      {filteredProduct.map((product) => {
        const productReviews = reviews[product._id] || [];
        const ratings = productReviews.map((el) => el.rating);
        const averageRating = calculateAverageRating(ratings);

        return (
          <Card
            title={product.name}
            price={product.price}
            product={product._id}
            imgUrl={product.image[0]}
            rating={averageRating.toString()}
          />
        );
      })}
    </div>
  );
};

export default ProductsList;
