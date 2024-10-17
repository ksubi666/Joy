'use client';

import { CheckCircle, Heart, Star } from 'lucide-react';
import Image from 'next/image';

const Cart = ({
  category,
  title,
  time,
  rating,
  price,
  count
}: {
  category: string;
  title: string;
  time: string;
  rating: string;
  price: string;
  count: number;
}) => {
 

  return (
    <div className='top-4 max-w-[1200px]mx-auto'>
      <h1 className='text-[25px] font-bold'>Shopping cart</h1>
      <div className='flex w-full max-h-[180px] justify-between rounded-xl overflow-hidden border-[1px] border-slate-200 right-2'>
        <div>
        <div className='relative w-[180px] h-[180px]'>
          <Image
            src="https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/blt73a14fd074527a97/66f14fad5f331eb7fbd87785/BCS-2024-Dubai-Hot-Air-Balloon-Desktop.jpg?auto=webp&quality=60"
            alt=""
            fill
            objectFit="cover"
          />
                    <div className="w-full h-full absolute bg-custom-gradient opacity-40 z-10"></div>
                    <Heart
              className="absolute top-4 right-4 z-20 hover:fill-[#F4F5F6] cursor-pointer"
              color="#F4F5F6"
            />
           </div>
           
          
</div>
        <div className='flex justify-between'>
            <div className='p-4 flex flex-col gap-3'>
            <h1 className="text-[18px] text-gray-500 text-transform: uppercase font-bold">{category}</h1>
            <h3 className="text-[18px] font-bold">{title}</h3>
            <h3 className="text-[14px] font-semibold">Spending time: {time}</h3>
          </div>
          <div className="flex flex-col p-4 text-end gap-3 ">
            <div className='flex items-center justify-end'>
              <Star color="#fcd34d" fill="#fcd34d" size={20} />
              <p>
                {rating.length == 1 ? rating + '.0' : rating}
              </p>
            </div>
            <p className='font-bold text-[30px]'>
              {price}
            </p>
            <p className='font-semibold'>
              {count} comments</p>

          </div>
          
        </div>
     </div>
     <div className='mt-20 gap-4 border-[1px] border-slate-200 rounded-xl flex flex-col p-6 justify-center'>
        <h1 className='font-bold text-[18px]'>Subtotal</h1>
        <p className='font-bold text-[30px] text-orange-500'>
              {price}</p>
        <button className='rounded-3xl  max-w-[400px] bg-[#EB4F47] text-white font-bold text-[18px] py-2 px-8 justify-center flex'>Order now</button>
        <div className='flex items-center gap-4 p-6'>
            <CheckCircle /> 
            <div>
                <p className='font-semibold'>Pay nothing today</p>
                <p className='font-semibold text-slate-500'>Book now and pay later</p>
            </div>
        </div>
        <div className='flex items-center gap-4 pb-6 px-6'>
            <CheckCircle /> 
            <div>
                <p className='font-semibold'>Free cancellation</p>
                <p className='font-semibold text-slate-500'>Until 9:15 AM on October 23</p>
            </div>
        </div>
     </div>
     </div>
  );
};

export default Cart;
