'use client';

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
import { CategorySelecter } from './CategorySelecter';
import Map from './Map';
import { useRef, useState } from 'react';
import { axiosInstance } from '@/lib/axios';
import { Textarea } from './ui/textarea';
import ImageSelecter from './ImageSelecter';
import { useRouter } from 'next/navigation';

interface InputFieldProps {
  label: string;
  placeholder: string;
}
const InputField: React.FC<InputFieldProps> = ({ label, placeholder }) => {
  return (
    <div className="flex flex-col gap-2">
      <h3>{label}</h3>
      {label === 'Description' ? (
        <Textarea placeholder={placeholder} />
      ) : (
        <Input placeholder={placeholder} />
      )}
    </div>
  );
};

const AdminAddProduct: React.FC = () => {
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const router = useRouter();

  const handlerSubmit = async () => {
    if (formRef.current) {
      const formElements = formRef.current
        .elements as HTMLFormControlsCollection;

      const payload = {
        name: (formElements[0] as HTMLInputElement).value,
        image: imageUrls,
        description: (formElements[1] as HTMLTextAreaElement).value,
        price: parseFloat((formElements[2] as HTMLInputElement).value),
        discount: parseFloat((formElements[3] as HTMLInputElement).value),
        categoryId: category,
        location: location,
      };

      try {
        await axiosInstance.post('/product/create', payload);
        console.log('Product created successfully');
        router.prefetch('/admin?menu=Categories');
      } catch (error) {
        console.error('Error creating product:', error);
      }
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-white text-[#F79A1F] font-bold flex text-[14px] items-center rounded-lg border-[1px] py-2 px-4 border-[#F79A1F]">
        <Plus />
        Add Product
      </AlertDialogTrigger>
      <AlertDialogContent className="min-w-[1000px] flex flex-col gap-5">
        <AlertDialogHeader>
          <AlertDialogTitle>Add Product</AlertDialogTitle>
        </AlertDialogHeader>
        <form ref={formRef} className="grid grid-cols-2 gap-20">
          <ImageSelecter
            imageUrls={imageUrls}
            setImageUrls={setImageUrls}
            signedUrl={signedUrl}
            setSignedUrl={setSignedUrl}
          />
          <div className="flex flex-col gap-5 font-medium">
            <InputField label="Title" placeholder="Title" />
            <InputField label="Description" placeholder="Description" />
            <InputField label="Price" placeholder="Price" />
            <InputField label="Discount" placeholder="Discount" />
            <div className="flex flex-col gap-2">
              <h3>Category</h3>
              <CategorySelecter setCategory={setCategory} />
            </div>
            <div className="flex flex-col gap-2">
              <h3>Location</h3>
              <div className="rounded-lg overflow-hidden h-[200px]">
                <Map
                  setLocation={setLocation}
                  location={location}
                  position={null}
                />
              </div>
            </div>
          </div>
        </form>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handlerSubmit}
            className="bg-[#F79A1F] hover:bg-[#F79A1F]"
          >
            Save
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AdminAddProduct;
