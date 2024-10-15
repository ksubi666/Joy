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
const ProductEditDialog = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-start">
        <Card
          title="Ghost, Ghouls and Gallows Walking Tour with Boat Ride"
          price="100000"
          rating="4"
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit product</AlertDialogTitle>
        </AlertDialogHeader>
        <div>
          <div className={styles.editContainer}>
            <h3>Name</h3>
            <Input />
          </div>
          <div className={styles.editContainer}>
            <h3>Image</h3>
            <Input />
          </div>
          <div className={styles.editContainer}>
            <h3>Description</h3>
            <Input />
          </div>
          <div className={styles.editContainer}>
            <h3>Price</h3>
            <Input />
          </div>
          <div className={styles.editContainer}>
            <h3>Discount</h3>
            <Input />
          </div>
          <div className={styles.editContainer}>
            <h3>Category</h3>
            <Input placeholder="select bolgono" />
          </div>
          <div className={styles.editContainer}>
            <h3>SubCategory</h3>
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
