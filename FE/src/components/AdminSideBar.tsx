import React from 'react';
import { Button } from './ui/button';
import AdminAddSubCategory from './AdminAddSubCategory';

const AdminSideBar = () => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <h2 className="text-[24px] font-bold">title</h2>
      <div className="flex flex-col gap-2">
        <Button className="bg-white border-[1px] hover:bg-white text-black font-semibold border-[#D6D8DB] rounded-full h-[28px]">
          haha haha
        </Button>
        <Button className="bg-white border-[1px] hover:bg-white text-black font-semibold border-[#D6D8DB] rounded-full h-[28px]">
          haha haha
        </Button>
        <AdminAddSubCategory />
      </div>
    </div>
  );
};

export default AdminSideBar;
