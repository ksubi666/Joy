'use client';
import { useEffect } from 'react';
import AdminInsight from '@/components/AdminInsight';
import AdminProducts from '@/components/AdminProducts';
import AdminSideBard from '@/components/AdminSideBard';
import { useRouter, useSearchParams } from 'next/navigation';
import Map from '@/components/Map';
import InsightOrderTitles from '@/components/InsightOrderTitles';
import InsightOrders from '@/components/InsightOrders';

const styles = {
  container: 'h-full max-w-[1200px] mx-auto flex gap-6 ',
  subContainer: ' w-full min-h-[850px] border-[1px] rounded-lg mb-10',
};

const page = () => {
  const searchParams = useSearchParams();
  const menu = searchParams.get('menu');
  const router = useRouter();

  useEffect(() => {
    if (!menu) {
      router.push(`/admin?menu=Insight`);
    }
  }, [menu, router]);

  return (
    <div className={styles.container}>
      <AdminSideBard />
      <div className={styles.subContainer}>
        {menu == 'Categories' && <AdminProducts />}
        {menu == 'Insight' && <AdminInsight />}
        {menu == 'Locations' && (
          <div className="p-5 h-full w-full">
            <Map center={[47.913938, 106.916631]} />
          </div>
        )}
        {menu == 'Orders' && (
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

export default page;
