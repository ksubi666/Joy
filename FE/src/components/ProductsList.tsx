'use client';
import { useEffect, useState } from 'react';
import Card from './Card';
import { axiosInstance } from '@/lib/axios';
import Link from 'next/link';
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
}

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
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

  return (
    <div className="flex flex-wrap max-w-[1200px] mx-auto gap-[25px] mb-10">
      {filteredProduct.map((product) => (
        <Link key={product._id} href={`/detailpage?product=${product._id}`}>
          <Card
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
