import React from 'react';
import ProductEditDialog from './ProductEditDialog';
import AdminAddCategory from './AdminAddCategory';
import AdminAddProduct from './AdminAddProduct';

const AdminProducts = () => {
  return (
    <div>
      <div className=" px-5 pt-5 flex justify-between">
        <AdminAddCategory />
        <AdminAddProduct />
      </div>
      <div className="flex flex-wrap gap-5 p-5">
        <ProductEditDialog
          title="Ghost, Ghouls and Gallows Walking Tour with Boat Ride"
          price="100000"
          imgUrl="https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/blt73a14fd074527a97/66f14fad5f331eb7fbd87785/BCS-2024-Dubai-Hot-Air-Balloon-Desktop.jpg?auto=webp&quality=60"
          rating="4"
          description="heheheheh"
          discount="10"
        />
      </div>
    </div>
  );
};

export default AdminProducts;
