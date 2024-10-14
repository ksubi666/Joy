import AdminCategory from '@/components/AdminCategory';
import AdminSideBar from '@/components/AdminSideBar';
import Card from '@/components/Card';
import React from 'react';

const page = () => {
  return (
    <div className="h-full border-t">
      <div className="w-[1200px] mx-auto py-10 flex justify-between gap-20">
        <AdminSideBar />
        <div className="flex flex-col gap-10 min-w-[1000px]">
          <AdminCategory />
          <div className="grid grid-cols-4 gap-4 ">
            <Card
              title="Ghost, Ghouls and Gallows Walking Tour with Boat Ride"
              price="100000"
              rating="4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
