import { Heart, Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Card = () => {
  return (
    <div className="p-20">
      <div className="w-[320px] h-[320px] relative rounded-xl overflow-hidden">
        <Image
          src="https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/blt73a14fd074527a97/66f14fad5f331eb7fbd87785/BCS-2024-Dubai-Hot-Air-Balloon-Desktop.jpg?auto=webp&quality=60"
          alt=""
          fill
          objectFit="cover"
        />
        <div className="w-full h-full absolute bg-custom-gradient opacity-40 z-10"></div>
        <Heart className="absolute top-4 right-4 z-20" color="#F4F5F6" />
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          <Star color="#F4F5F6" fill="#F4F5F6" size={16} />
          <p className="text-[#F4F5F6]">4.5</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
