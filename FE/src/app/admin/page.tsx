'use client';
import AdminInsight from '@/components/AdminInsight';
import AdminProducts from '@/components/AdminProducts';
import AdminSideBard from '@/components/AdminSideBard';

import React, { useState } from 'react';

const page = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handlerClick = (el: string) => {
    if (el == 'Products') {
      setIsOpen(!isOpen);
    }
  };
  return (
    <div className="h-full max-w-[1200px] mx-auto flex gap-6 ">
      <AdminSideBard
        handlerClick={handlerClick}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className=" w-full min-h-[850px] border-[1px] rounded-lg mb-10">
        {isOpen && <AdminProducts />}
        <AdminInsight />
      </div>
    </div>
  );
};

export default page;
