'use client';

import Subcategory from '@/components/Subcategory';
import MainPage from '../components/MainPage';
import { useEffect, useState } from 'react';
import ProductsList from '@/components/ProductsList';
import { axiosInstance } from '@/lib/axios';
import { useRouter } from 'next/navigation';

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
    const { data } = await axiosInstance.get('/category/getCategories');
    setCategories(data);
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div>
      <MainPage categories={categories.slice(0, 5)} />
      <Subcategory categories={categories.slice(5, 30)} />
      <ProductsList />
    </div>
  );
}
