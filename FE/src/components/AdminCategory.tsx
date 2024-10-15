import React from 'react';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import AdminAddCategory from './AdminAddCategory';

const AdminCategory = () => {
  return (
    <div className="flex justify-between items-start gap-10">
      <AdminAddCategory />
      <div className="flex gap-2">
        <Button className="bg-white border-[1px] hover:bg-white text-black rounded-lg font-semibold border-[#D6D8DB]">
          haha haha
        </Button>
      </div>
      <Button className="bg-white border-[1.5px] hover:bg-white border-[#F79A1F] text-[#F79A1F] rounded-full font-bold">
        <Plus />
        Add Product
      </Button>
    </div>
  );
};

export default AdminCategory;
