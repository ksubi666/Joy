import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Card from './Card';
import { Input } from './ui/input';
const styles = { editContainer: 'flex flex-col gap-2 font-medium' };
const ProductEditDialog = ({
  title,
  price,
  rating,
  imgUrl,
  description,
  discount,
}: {
  title: string;
  price: string;
  rating: string;
  imgUrl: string;
  description: string;
  discount: string;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-start">
        <Card title={title} price={price} imgUrl={imgUrl} rating={rating} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit product</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-col gap-3">
          <div className={styles.editContainer}>
            <h3>Title</h3>
            <Input placeholder={title} />
          </div>
          <div className={styles.editContainer}>
            <h3>Image</h3>
            <Input placeholder={imgUrl} />
          </div>
          <div className={styles.editContainer}>
            <h3>Description</h3>
            <Input placeholder={description} />
          </div>
          <div className={styles.editContainer}>
            <h3>Price</h3>
            <Input placeholder={price + '₮'} />
          </div>
          <div className={styles.editContainer}>
            <h3>Discount</h3>
            <Input placeholder={discount + '%'} />
          </div>
          <div className={styles.editContainer}>
            <h3>Category</h3>
            <Input placeholder="select bolgono" />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-[#F79A1F] hover:bg-[#F79A1F]">
            Save
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default ProductEditDialog;
