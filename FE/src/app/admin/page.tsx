'use client';
import { useEffect, useState } from 'react';
import AdminInsight from '@/components/AdminInsight';
import AdminProducts from '@/components/AdminProducts';
import AdminSideBard from '@/components/AdminSideBard';
import { useRouter, useSearchParams } from 'next/navigation';
import Map from '@/components/Map';
import InsightOrderTitles from '@/components/InsightOrderTitles';
import InsightOrders from '@/components/InsightOrders';
import { axiosInstance } from '@/lib/axios';

const styles = {
  container: 'h-full max-w-[1200px] mx-auto flex gap-6 py-5',
  subContainer: 'w-full min-h-[850px] border-[1px] rounded-lg mb-10',
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

const Page = () => {
  const searchParams = useSearchParams();
  const menu = searchParams.get('menu');
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!menu) {
      router.push(`/admin?menu=Insight`);
    }
  }, [menu, router]);

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
    <div className={styles.container}>
      <AdminSideBard />
      <div className={styles.subContainer}>
        {menu === 'Insight' && <AdminInsight />}
        {menu === 'Categories' && <AdminProducts products={products} />}
        {menu === 'Locations' && (
          <div className="p-5 h-full w-full">
            <Map
              center={[47.913938, 106.916631]}
              position={products}
              location={null}
              setLocation={null}
            />
          </div>
        )}
        {menu === 'Orders' && (
          <div className="h-fit rounded-lg flex flex-col gap-1 overflow-y-auto">
            <InsightOrderTitles />
            <InsightOrders />
            <InsightOrders />
            <InsightOrders />
            <InsightOrders />
            <InsightOrders />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
