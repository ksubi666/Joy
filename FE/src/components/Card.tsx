'use client';
import { Heart, Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';

const Card = ({
  title,
  price,
  rating,
}: {
  title: string;
  price: string;
  rating: string;
}) => {
  const pathname = usePathname();
  return (
    <div
      className={
        pathname == '/admin'
          ? 'border-[1px] rounded-xl w-[220px] flex flex-col items-center justify-center '
          : 'border-[1px] rounded-xl w-[280px] flex flex-col items-center justify-center '
      }
    >
      <div
        className={
          pathname == '/admin'
            ? 'w-[220px] h-[220px] relative rounded-t-xl overflow-hidden'
            : 'w-[280px] h-[280px] relative rounded-t-xl overflow-hidden'
        }
      >
        <Image
          src="https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/blt73a14fd074527a97/66f14fad5f331eb7fbd87785/BCS-2024-Dubai-Hot-Air-Balloon-Desktop.jpg?auto=webp&quality=60"
          alt=""
          fill
          objectFit="cover"
        />
        <div className="w-full h-full absolute bg-custom-gradient opacity-40 z-10"></div>
        {pathname == '/admin' ? null : (
          <Heart
            className="absolute top-4 right-4 z-20 hover:fill-[#F4F5F6] cursor-pointer"
            color="#F4F5F6"
          />
        )}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          <Star color="#F4F5F6" fill="#F4F5F6" size={16} />
          <p className="text-[#F4F5F6]">
            {rating.length == 1 ? rating + '.0' : rating}
          </p>
        </div>
      </div>
      <div className="p-3 flex flex-col gap-2 font-semibold ">
        <h1 className="text-[18px] ">{title}</h1>
        <div className="w-full flex justify-between items-center">
          <h3 className="text-[20px]">{price}</h3>
          <Button className="bg-white border-[1px] text-black rounded-full hover:bg-white">
            {pathname == '/admin' ? 'Edit' : 'Add to cart'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
