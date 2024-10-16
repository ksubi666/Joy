'use client';
import React, { useEffect } from 'react';
import AdminInsight from '@/components/AdminInsight';
import AdminProducts from '@/components/AdminProducts';
import AdminSideBard from '@/components/AdminSideBard';
import { useRouter, useSearchParams } from 'next/navigation';

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
        {menu == 'Products' && <AdminProducts />}
        {menu == 'Insight' && <AdminInsight />}
      </div>
    </div>
  );
};

export default page;
