import React from 'react';
import ProductEditDialog from './ProductEditDialog';

const AdminProducts = () => {
  return (
    <div className="flex flex-wrap gap-5">
      <ProductEditDialog />
      <ProductEditDialog />
      <ProductEditDialog />
      <ProductEditDialog />
      <ProductEditDialog />
      <ProductEditDialog />
      <ProductEditDialog />
      <ProductEditDialog />
    </div>
  );
};

export default AdminProducts;
