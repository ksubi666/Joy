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
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <div
        style={{
          display: 'flex',
          transition: 'transform 0.5s ease-in-out',
          transform: `translateX(-${currentSlide * 100}%)`,
          width: `${slides.length * 100}%`,
        }}
      >
        {slides.map((slide) => (
          <div key={slide.id} style={{ width: '100%', flexShrink: 0, position: 'relative' }}>
            <img
              src={slide.image}
              style={{ width: '1440px', height: '404px' }}
            />
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))', 
              zIndex: 1,
            }} />
           
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', bottom: '5px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '20px', justifyContent: 'space-between' }}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => (category)}
            style={{
              padding: '10px',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '24px',
              transition: 'background 0.3s',
            }}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
