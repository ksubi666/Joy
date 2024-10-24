'use client';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { axiosInstance } from '@/lib/axios';
import { useEffect, useState } from 'react';

interface Category {
  _id: string;
  name: string;
}

export function CategorySelecter({
  setCategory,
}: {
  setCategory: (categories: string[]) => void;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await axiosInstance.get('/category/getCategories');
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    getCategories();
  }, []);

  const handleSelectChange = (value: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(value)) {
        return prev.filter((category) => category !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  useEffect(() => {
    setCategory(selectedCategories);
  }, [selectedCategories, setCategory]);

  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className="w-full h-12">
        <SelectValue placeholder="Select categories" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          {categories.map((category) => (
            <SelectItem
              key={category._id}
              value={category._id}
              className="capitalize"
            >
              {category.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
