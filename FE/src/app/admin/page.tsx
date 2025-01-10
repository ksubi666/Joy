'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { axiosInstance } from '@/lib/axios';
import dynamic from 'next/dynamic';

const DynamicComponents = {
  InsightOrders: dynamic(() => import('@/components/InsightOrders'), {
    ssr: false,
  }),
  InsightOrderTitles: dynamic(() => import('@/components/InsightOrderTitles'), {
    ssr: false,
  }),
  Map: dynamic(() => import('@/components/Map'), { ssr: false }),
  AdminSideBard: dynamic(() => import('@/components/AdminSideBard'), {
    ssr: false,
  }),
  AdminProducts: dynamic(() => import('@/components/AdminProducts'), {
    ssr: false,
  }),
  AdminInsight: dynamic(() => import('@/components/AdminInsight'), {
    ssr: false,
  }),
};

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
    if (!menu) router.push(`/admin?menu=Insight`);
  }, [menu, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, ordersResponse] = await Promise.all([
          axiosInstance.get<Product[]>('/product/getProducts'),
          axiosInstance.get<Order[]>('/order/getOrders'),
        ]);
        setProducts(productsResponse.data);
        setOrders(ordersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderContent = () => {
    switch (menu) {
      case 'Insight':
        return <DynamicComponents.AdminInsight orders={orders} />;
      case 'Categories':
        return <DynamicComponents.AdminProducts products={products} />;
      case 'Locations':
        return (
          <div className="p-5 h-full w-full">
            <DynamicComponents.Map
              center={[47.913938, 106.916631]}
              position={products}
              location={null}
              setLocation={null}
            />
          </div>
        );
      case 'Orders':
        return (
          <div className="h-fit rounded-lg flex flex-col gap-1 overflow-y-auto">
            <DynamicComponents.InsightOrderTitles />
            {orders.length > 0 ? (
              orders.map((order) => (
                <DynamicComponents.InsightOrders
                  key={order.orderNumber}
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
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <DynamicComponents.AdminSideBard />
      <div className={styles.subContainer}>{renderContent()}</div>
    </div>
  );
};

export default Page;
