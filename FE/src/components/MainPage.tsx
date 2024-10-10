'use client'

import React, { useEffect, useState } from 'react';

const slides = [
  { id: 1, image: 'https://www.paragliding.mn/wp-content/uploads/2021/08/Hero-slider-1.jpg' },
  { id: 2, image: 'https://www.tahititourisme.com/app/uploads/iris-images/17510/tester-laccrobranche-a-myles-mcguinness-1920x1080-f50_50.webp'},
  { id: 3, image: 'https://hub.suttons.co.uk/wp-content/uploads/2015/08/Copy-of-Copy-of-Untitled-75-800x419.jpg' },
  { id: 4, image: 'https://www.lawnstarter.com/blog/wp-content/uploads/2022/12/iStock-1423384637-2-feature-image-1.jpg' },
];

const categories = ['Art & crafts', 'Adventure', 'Sports', 'Gifts', 'Courses'];

const MainPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)`, width: `${slides.length * 100}%` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0 relative">
            <img
              src={slide.image}
              className="w-[1440px] h-[404px] object-cover"
              alt={`Slide ${slide.id}`}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80 z-1" />
          </div>
        ))}
      </div>
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 justify-around w-screen">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => (category)}
            className="px-3 py-2 text-white font-bold text-2xl transition bg-transparent hover:bg-gray-700 rounded"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MainPage;

