'use client';
import Subcategory from '@/components/Subcategory';
import MainPage from '../components/MainPage';
import { useEffect, useState } from 'react';
import ProductsList from '@/components/ProductsList';
import { axiosInstance } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import Cart from './cart/page';

interface Category {
  _id: number;
  name: string;
}

export default function Home() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    router.push(`/?category=art%20Crafts`);
  }, [router]);

  const getCategories = async () => {
    try {
      const { data } = await axiosInstance.get('/category/getCategories');
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      {/* <MainPage categories={categories.slice(0, 5)} />
      <Subcategory categories={categories.slice(5, 30)} />
      <ProductsList /> */}
      <Cart
        category="Sports"
        title="O2 Arena Rooftop Climbing Experience"
        time='4 hoours'
        rating='5'
        price='789,000₮'
        count={303}
      />
    </div>
  );
}
