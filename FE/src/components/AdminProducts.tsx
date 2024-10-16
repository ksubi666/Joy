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
        <ProductEditDialog />
      </div>
    </div>
  );
};

export default AdminProducts;
