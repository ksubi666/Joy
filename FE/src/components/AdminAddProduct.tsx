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
import Image from 'next/image';
import { Button } from './ui/button';
import { axiosInstance } from '@/lib/axios';

const InputField = ({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) => (
  <div className="flex flex-col gap-2">
    <h3>{label}</h3>
    <Input placeholder={placeholder} />
  </div>
);

interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  description: HTMLInputElement;
  price: HTMLInputElement;
  discount: HTMLInputElement;
  file: HTMLInputElement;
}

const AdminAddProduct = () => {
  const [location, setLocation] = useState(null);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<Array<string>>([]);
  const [category, setCategory] = useState<Array<string> | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleUploadUrl = async () => {
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: `${randomNumber}`,
          fileType: 'image/png',
        }),
      });
      const data = await response.json();
      setImageUrls((prev) => [...prev, data.fileName]);
      setSignedUrl(data.signedUrl);
    } catch (error) {
      console.error('Error fetching upload URL:', error);
    }
  };

  const handleUploadImg = async () => {
    if (!signedUrl || !formRef.current) return;

    const file = formRef.current.file.files[0];
    if (!file) {
      console.error('No file selected for upload.');
      return;
    }

    try {
      const res = await fetch(signedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      });
      if (res.ok) {
        console.log('Image uploaded successfully.');
      } else {
        console.error('Image upload failed:', res.statusText);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handlerSubmit = async () => {
    if (!formRef.current) return;

    const formElements = formRef.current.elements as FormElements;

    try {
      await axiosInstance.post('/product/create', {
        name: formElements.title.value,
        image: imageUrls,
        description: formElements.description.value,
        price: formElements.price.value,
        discount: formElements.discount.value,
        categoryId: category,
        location: location,
      });
      console.log('Product created successfully');
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const previewImages =
    imageUrls.length > 0
      ? imageUrls.map(
          (img) =>
            `https://pub-085cb38b95fb4b51936e3f399499e3cd.r2.dev/joy/${img}`
        )
      : [
          'https://static.wixstatic.com/media/ea71bb_92c8a41554974578951b17ed811d4df6~mv2.png/v1/fill/w_2620,h_1540,q_90/ea71bb_92c8a41554974578951b17ed811d4df6~mv2.webp',
        ];

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
          <div className="flex flex-col gap-5 h-full">
            <div className="relative w-[480px] h-[380px] rounded-lg overflow-hidden">
              <Image
                src={previewImages[0]}
                alt="Preview"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
              <Input
                type="file"
                name="file"
                onChange={handleUploadUrl}
                className="absolute top-[40%] left-[25%] bg-white w-[250px] h-10"
              />
              <Button
                type="button"
                onClick={handleUploadImg}
                className="absolute top-[55%] left-[60%] bg-white text-black hover:bg-white"
              >
                Upload
              </Button>
            </div>
            <div className="flex gap-4 overflow-auto w-[480px]">
              {previewImages.map((src, index) => (
                <div
                  key={index}
                  className="min-w-[200px] h-[200px] relative rounded-lg overflow-hidden"
                >
                  <Image
                    src={src}
                    alt={`Uploaded Image ${index + 1}`}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                  />
                </div>
              ))}
            </div>
          </div>
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
                <Map setLocation={setLocation} location={location} />
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
