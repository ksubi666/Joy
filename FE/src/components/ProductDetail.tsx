'use client';
import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';
import { Heart } from 'lucide-react';
import Map from '@/components/Map';

const ProductDetail = () => {
  return (
    <div className="grid grid-cols-2 w-[1200px] mx-auto py-10 gap-28">
      <div className="flex flex-col gap-7">
        <div className="relative w-[600px] h-[600px] rounded-lg overflow-hidden">
          <Image
            src={
              'https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/blt73a14fd074527a97/66f14fad5f331eb7fbd87785/BCS-2024-Dubai-Hot-Air-Balloon-Desktop.jpg?auto=webp&quality=60'
            }
            fill
            alt={''}
            objectFit="cover"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Button className="rounded-full h-[24px] px-4 py-2 bg-[#EB4F47] hover:bg-[#EB4F47] font-bold w-fit">
          CategoryName
        </Button>
        <h1 className="text-[32px] font-semibold">
          Ghost, Ghouls and Gallows Walking Tour with Boat Ride
        </h1>
        <div className="flex flex-col gap-3">
          <p className="font-bold text-[28px]">Price: 100000₮</p>
          <div className="flex w-full items-center gap-7">
            <Heart size={30} />
            <Button className="bg-[#EB4F47] hover:bg-[#EB4F47] font-bold w-full h-12">
              Add to Cart
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-[18px] font-semibold">Description</h3>
          <p className="font-medium">
            Step into the heart of everyone’s favourite TV show with The
            FRIENDS™ Experience: The One in London. Explore interactive set
            recreations for a nostalgia-packed immersive experience. Get your
            cameras out and re-create your favourite scenes from the show; dance
            in front of the fountain, peep through the iconic purple door at
            Rachel and Monica’s apartment, play foosball at Joey and Chandler’s
            and take a selfie on the orange couch in Central Perk. Explore a
            treasure trove of props from the show, including The Turkey Head,
            Phoebe’s New Year cab, and the infamous 18-page letter. With
            countless photo opportunities, delicious snacks, and of course
            coffee, this is an experience you wont want to miss.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-[18px] font-semibold">Location</h3>
          <div className=" rounded-lg w-full h-[250px] overflow-hidden">
            <Map center={[47.890664, 106.909683]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
