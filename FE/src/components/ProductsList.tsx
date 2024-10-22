'use client';
import { useEffect, useState } from 'react';
import Card from './Card';
import { axiosInstance } from '@/lib/axios';

interface Product {
  name: string;
  price: string;
  image: string[];
}

const ProductsList = () => {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await axiosInstance.get<Product[]>(
        '/product/getProducts'
      );
      setProducts(data);
      console.log(data);
    };
    getProducts();
  }, []);

  return (
    <div className="flex flex-wrap max-w-[1200px] mx-auto gap-[25px] mb-10">
      {products?.map((product) => (
        <Card
          key={product.name}
          title={product.name}
          price={product.price}
          imgUrl={`https://pub-085cb38b95fb4b51936e3f399499e3cd.r2.dev/joy/${product.image[0]}`}
          rating="4"
        />
      ))}
      <Card
        title="Ghost, Ghouls and Gallows Walking Tour with Boat Ride"
        price="100000"
        imgUrl="https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/blt73a14fd074527a97/66f14fad5f331eb7fbd87785/BCS-2024-Dubai-Hot-Air-Balloon-Desktop.jpg?auto=webp&quality=60"
        rating="4"
      />
    </div>
  );
};
export default ProductsList;
