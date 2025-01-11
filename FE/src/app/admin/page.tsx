'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { axiosInstance } from '@/lib/axios';
import dynamic from 'next/dynamic';

const InsightOrders = dynamic(() => import('@/components/InsightOrders'), {
  ssr: false,
});
const InsightOrderTitles = dynamic(
  () => import('@/components/InsightOrderTitles'),
  {
    ssr: false,
  }
);
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
});
const AdminSideBard = dynamic(() => import('@/components/AdminSideBard'), {
  ssr: false,
});
const AdminProducts = dynamic(() => import('@/components/AdminProducts'), {
  ssr: false,
});
const AdminInsight = dynamic(() => import('@/components/AdminInsight'), {
  ssr: false,
});

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

interface Order {
  status: string;
  userId: { name: string };
  phone: string;
  date: string;
  createdDate: string;
  time: string;
  orderNumber: string;
}

const Page = () => {
  const searchParams = useSearchParams();
  const menu = searchParams.get('menu');
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

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

    const getOrders = async () => {
      const { data } = await axiosInstance.get<Order[]>('/order/getOrders');
      setOrders(data);
      console.log(data);
    };

    getOrders();
    getProducts();
  }, []);

  return (
    <div className={styles.container}>
      <AdminSideBard />
      <div className={styles.subContainer}>
        {menu === 'Insight' && <AdminInsight orders={orders} />}
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
            {orders.length > 0 ? (
              orders.map((order) => (
                <InsightOrders
                  status={order.status}
                  userName={order.userId.name}
                  phoneNumber={order.phone}
                  date={order.date.slice(0, 10)}
                  createdAt={order.createdDate.slice(0, 10)}
                  time={order.time}
                  orderNumber={order.orderNumber}
                />
              ))
            ) : (
              <p>No orders found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
