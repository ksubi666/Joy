import React from 'react';
import ProductEditDialog from './ProductEditDialog';
import AdminAddCategory from './AdminAddCategory';
import AdminAddProduct from './AdminAddProduct';

const AdminProducts = () => {
  return (
    <div>
      <div className="border-b p-5 flex justify-between">
        <AdminAddCategory />
        <AdminAddProduct />
      </div>
      <div className="flex flex-wrap gap-5 p-5">
        <ProductEditDialog />
        <ProductEditDialog />
        <ProductEditDialog />
        <ProductEditDialog />
        <ProductEditDialog />
        <ProductEditDialog />
        <ProductEditDialog />
        <ProductEditDialog />
      </div>
    </div>
  );
};

export default AdminProducts;
