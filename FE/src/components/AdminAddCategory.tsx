'use client';

import React, { useRef, FormEvent } from 'react';
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
import { Plus } from 'lucide-react';
import { Input } from './ui/input';
import { axiosInstance } from '@/lib/axios';

const styles = {
  container:
    'bg-white text-[#F79A1F] font-bold flex text-[14px] items-center rounded-lg border-[1px] py-2 px-4 border-[#F79A1F] outline-none',
};

const AdminAddCategory: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const { categoryName } = Object.fromEntries(formData) as {
      categoryName: string;
    };

    await axiosInstance.post('/category/create', {
      name: categoryName,
    });
    location.replace(`/admin?menu=Products`);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className={styles.container}>
        <Plus />
        Add Category
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add Category</AlertDialogTitle>
        </AlertDialogHeader>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <Input
            name="categoryName"
            className="outline-none "
            placeholder="Category Name"
          />
          <AlertDialogFooter>
            <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
            <AlertDialogAction
              type="submit"
              className="bg-[#F79A1F] hover:bg-[#F79A1F]"
            >
              Save
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AdminAddCategory;
