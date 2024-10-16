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
import { Plus } from 'lucide-react';
import { Input } from './ui/input';

const AdminAddCategory = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-white text-[#F79A1F] font-bold flex text-[14px] items-center rounded-lg border-[1px] py-2 px-4 border-[#F79A1F]">
        <Plus />
        Add Category
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add Category</AlertDialogTitle>
        </AlertDialogHeader>
        <Input className="outline-none " placeholder="Category Name" />
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

export default AdminAddCategory;
