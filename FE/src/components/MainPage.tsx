'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const slides = [
  {
    id: 1,
    image:
      'https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/blt73a14fd074527a97/66f14fad5f331eb7fbd87785/BCS-2024-Dubai-Hot-Air-Balloon-Desktop.jpg?auto=webp&quality=60',
  },
  {
    id: 2,
    image:
      'https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/blt943ae4261473ea5f/66e83805aeec9e82787e3aa1/BCS-2024-Paris-Bakery-Homepage-Desktop.jpg',
  },
  {
    id: 3,
    image:
      'https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/blt8dee98b92fc59b7e/66ad09cbd68a7bc606576448/iStock-1429927208-edited-extended-v2-2500px.jpg',
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
