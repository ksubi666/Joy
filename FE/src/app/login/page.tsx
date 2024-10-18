import Login from '@/components/Login';
import Image from 'next/image';
import React from 'react';
import image from '../../assets/LoginImage.png';

const page = () => {
  return (
    <div className="w-[1000px] mx-auto rounded-3xl shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] h-[700px] grid grid-cols-2 overflow-hidden my-6">
      <Login />
      <div className="relative h-[700px] w-[550px]">
        <Image fill src={image} alt="banner image" />
      </div>
    </div>
  );
};

export default page;
