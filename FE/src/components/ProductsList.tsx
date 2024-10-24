'use client';
import { useEffect, useState } from 'react';
import Card from './Card';
import { axiosInstance } from '@/lib/axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import _ from 'lodash';

interface Product {
  name: string;
  price: string;
  image: string[];
  _id: string;
}

const ProductsList = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [filteredProduct, setFilteredProduct] = useState(products);
  const searchParams = useSearchParams();

  const category = searchParams.get('category');

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await axiosInstance.get<Product[]>(
        '/product/getProducts'
      );
      setProducts(data);
      setFilteredProduct(
        data &&
          _.filter(
            data,
            (product, i) =>
              (product.categoryId[0] &&
                product.categoryId[0].name == category) ||
              (product.categoryId[1] &&
                product.categoryId[1].name == category) ||
              (product.categoryId[2] && product.categoryId[2].name == category)
          )
      );
    };
    getProducts();
  }, []);

  useEffect(() => {
    setFilteredProduct(
      products &&
        _.filter(
          products,
          (product, i) =>
            (product.categoryId[0] && product.categoryId[0].name == category) ||
            (product.categoryId[1] && product.categoryId[1].name == category) ||
            (product.categoryId[2] && product.categoryId[2].name == category)
        )
    );
  }, [category]);
  console.log(filteredProduct);
  return (
    <div className="flex flex-wrap max-w-[1200px] mx-auto gap-[25px] mb-10">
      {filteredProduct?.map((product) => (
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
