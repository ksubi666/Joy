"use client";

import { useState } from "react";
import Card from "./Card";
import { Button } from "./ui/button";

interface Product {
  title: string;
  price: number;
  rating: string;
  imgUrl: string;
  product: string;
}

const Trending = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      title: 'Product title',
      price: 99999,
      rating: '2',
      imgUrl: 'https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/blt943ae4261473ea5f/66e83805aeec9e82787e3aa1/BCS-2024-Paris-Bakery-Homepage-Desktop.jpg',
      product: 'adventure',
    },
    {
      title: 'Product title',
      price: 99999,
      rating: '2',
      imgUrl: 'https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/blt943ae4261473ea5f/66e83805aeec9e82787e3aa1/BCS-2024-Paris-Bakery-Homepage-Desktop.jpg',
      product: 'adventure',
    },
    {
      title: 'Product title',
      price: 99999,
      rating: '2',
      imgUrl: 'https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/blt943ae4261473ea5f/66e83805aeec9e82787e3aa1/BCS-2024-Paris-Bakery-Homepage-Desktop.jpg',
      product: 'adventure',
    },
  ]);

  return (
    <div className="flex gap-6 my-8">
      <div className="flex flex-col gap-6 ml-2">
        <h3 className="text-red-600 text-[20px] font-bold">EXCLUSIVE TO JOY</h3>
        <h1 className="text-gray-900 text-[50px] font-bold">Trending</h1>
        <Button className="bg-red-500 py-2 px-5 text-white font-bold text-[18px] w-fit drop-shadow-md">Shop now</Button>
      </div>
      <div className="flex gap-4">
        {products.map((product) => (
          <Card
            key={product.product}
            title={product.title}
            price={product.price.toString()}
            rating={product.rating}
            imgUrl={product.imgUrl}
            product={product.product}
          />
        ))}
      </div>
     
    </div>
  );
}

export default Trending