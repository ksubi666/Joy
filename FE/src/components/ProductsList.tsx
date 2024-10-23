'use client';
import { useEffect, useState } from 'react';
import Card from './Card';
import { axiosInstance } from '@/lib/axios';
import Link from 'next/link';

interface Product {
  name: string;
  price: string;
  image: string[];
  _id: string;
}

const ProductsList = () => {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await axiosInstance.get<Product[]>(
        '/product/getProducts'
      );
      setProducts(data);
    };
    getProducts();
  }, []);

  return (
    <div className="flex flex-wrap max-w-[1200px] mx-auto gap-[25px] mb-10">
      {products?.map((product) => (
        <Link href={`/detailpage?product=${product._id}`}>
          <Card
            key={product.name}
            title={product.name}
            price={product.price}
            imgUrl={`https://pub-085cb38b95fb4b51936e3f399499e3cd.r2.dev/joy/${product.image[0]}`}
            rating="4"
          />
        </Link>
      ))}
    </div>
  );
};
export default ProductsList;
