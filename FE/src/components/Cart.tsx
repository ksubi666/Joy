'use client';

import { Heart, Star } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Cart = ({
  category,
  title,
  rating,
  price,
  comment,
  image,
}: {
  category: string;
  title: string;
  rating: string;
  price: string;
  comment: number;
  image: string;
}) => {
  const pathname = usePathname();

  return (
    <div className="flex w-full max-h-[180px] justify-between rounded-xl overflow-hidden border-[1px] border-slate-200">
      <div className="flex">
        <div className="relative w-[180px] h-[180px]">
          <Image
            src={`https://pub-085cb38b95fb4b51936e3f399499e3cd.r2.dev/joy/${image}`}
            alt=""
            fill
            objectFit="cover"
          />
          <div className="w-full h-full absolute bg-custom-gradient opacity-40 z-10"></div>
          {pathname == '/wishlist' && (
            <Heart
              className="absolute top-4 right-4 z-20 hover:fill-[#F4F5F6] cursor-pointer"
              color="#F4F5F6"
              fill={pathname == '/wishlist' ? '#F4F5F6' : 'none'}
            />
          )}
        </div>
        <div className="p-4 flex flex-col gap-3">
          <h1 className="text-[18px] text-gray-500 text-transform: uppercase font-bold">
            {category}
          </h1>
          <h3 className="text-[18px] font-bold">{title}</h3>
        </div>
      </div>
      <div className="flex flex-col p-4 text-end gap-3 ">
        <div className="flex items-center justify-end">
          <Star color="#fcd34d" fill="#fcd34d" size={20} />
          <p>{rating.length == 1 ? rating + '.0' : rating}</p>
        </div>
        <p className="font-bold text-[30px]">{price}</p>
        <p className="font-semibold">{comment} comments</p>
      </div>
    </div>
  );
};

export default Cart;
