'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const slides = [
  {
    id: 1,
    image:
      'https://www.paragliding.mn/wp-content/uploads/2021/08/Hero-slider-1.jpg',
  },
  {
    id: 2,
    image:
      'https://www.tahititourisme.com/app/uploads/iris-images/17510/tester-laccrobranche-a-myles-mcguinness-1920x1080-f50_50.webp',
  },
  {
    id: 3,
    image:
      'https://hub.suttons.co.uk/wp-content/uploads/2015/08/Copy-of-Copy-of-Untitled-75-800x419.jpg',
  },
  {
    id: 4,
    image:
      'https://ice-blog.riedellskates.com/wp-content/uploads/2022/10/shutterstock_2200208391-1.jpg',
  },
];
interface Category {
  _id: number;
  name: string;
}

const MainPage = ({ categories }: { categories: Category[] }) => {
  const searchParams = useSearchParams();
  const categoryParams = searchParams.get('category');

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex max-w-full h-[604px] transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
          width: `${slides.length * 100}%`,
        }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full h-full flex-shrink-0 relative">
            <Image
              src={slide.image}
              fill
              alt={`Slide ${slide.id}`}
              style={{ objectFit: 'cover', objectPosition: 'top' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 z-1" />
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2 justify-center w-screen mx-auto">
        {categories &&
          categories.map((category) => (
            <Link
              href={`/?category=${category.name}`}
              scroll={false}
              key={category._id}
              className={
                categoryParams == category.name
                  ? 'w-[240px] px-3 py-3 font-bold text-2xl transition bg-transparent bg-white text-black rounded-t-xl capitalize flex justify-center items-center'
                  : 'w-[240px] px-3 py-3 text-white font-bold text-2xl transition bg-transparent hover:bg-white hover:text-black rounded-t-xl capitalize flex justify-center items-center'
              }
            >
              {category.name}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default MainPage;
