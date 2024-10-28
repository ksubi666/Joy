'use client';

import { Heart, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { StarRating } from './StartRating';
import { axiosInstance } from '@/lib/axios';

const Cart = ({
  category,
  title,
  rating,
  price,
  comment,
  image,
  id,
}: {
  category: string;
  title: string;
  rating: string;
  price: string;
  comment: number;
  image: string;
  id: string;
}) => {
  const pathname = usePathname();

  const cartId = localStorage.getItem('cartId');
  const wishlistId = localStorage.getItem('wishlistId');

  const handlerDeleteCartItem = async () => {
    await axiosInstance.delete('/cart/deleteCartItem', {
      data: {
        productId: id,
        id: cartId,
      },
    });
  };
  const handlerDeleteWishlistItem = async () => {
    await axiosInstance.delete('/wishlist/deleteWishlistItem', {
      data: {
        productId: id,
        id: wishlistId,
      },
    });
  };
  return (
    <Link
      href={`/detailpage?product=${id}`}
      className="flex w-full max-h-[180px] justify-between rounded-xl overflow-hidden border-[1px] border-slate-200"
    >
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
        <div
          className="flex justify-end"
          onClick={
            pathname == '/cart'
              ? handlerDeleteCartItem
              : handlerDeleteWishlistItem
          }
        >
          <X size={20} color="#272727" />
        </div>
        <p className="font-bold text-[30px]">{price}</p>
        <div className="flex flex-col items-end gap-1">
          <StarRating rating={Number(rating)} />
          <p className="font-meduim">{comment} comments</p>
        </div>
      </div>
    </Link>
  );
};

export default Cart;
