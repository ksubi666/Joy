import Card from '@/components/Card';
import Image from 'next/image';
import React from 'react';

export default function Home() {
  return (
    <div>
      <div className="w-full h-[600px] relative">
        <Image
          src="https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/blt73a14fd074527a97/66f14fad5f331eb7fbd87785/BCS-2024-Dubai-Hot-Air-Balloon-Desktop.jpg?auto=webp&quality=60"
          alt=""
          fill
          objectFit="cover"
        />
      </div>
      <Card />
    </div>
  );
}
