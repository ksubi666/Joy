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
      <AlertDialogTrigger className="bg-white border-[1.5px] hover:bg-white border-[#F79A1F] text-[#F79A1F] rounded-full font-bold flex px-4 h-10 items-center text-[14px]">
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
