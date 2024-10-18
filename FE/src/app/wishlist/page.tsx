'use client';
import Cart from '@/components/Cart';
import { CheckCircle } from 'lucide-react';

const page = () => {
  return (
    <div className="max-w-[1440px] px-[120px] mx-auto flex flex-col gap-5 pt-7 pb-20 h-fit">
      <h1 className="text-[25px] font-bold">Wishlist</h1>
      <Cart
        category="Sports"
        title="O2 Arena Rooftop Climbing Experience"
        time="4 hoours"
        rating="5"
        price="789,000₮"
        comment={303}
      />
      <div className="mt-20 gap-4 border-[1px] border-slate-200 rounded-xl flex flex-col p-6 justify-center">
        <h1 className="font-bold text-[18px]">Subtotal</h1>
        <p className="font-bold text-[30px] text-orange-500">10000</p>
        <button className="rounded-3xl  max-w-[400px] bg-[#EB4F47] text-white font-bold text-[18px] py-2 px-8 justify-center flex">
          Add to Cart
        </button>
        <div className="flex items-center gap-4 p-6">
          <CheckCircle />
          <div>
            <p className="font-semibold">Pay nothing today</p>
            <p className="font-semibold text-slate-500">
              Book now and pay later
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 pb-6 px-6">
          <CheckCircle />
          <div>
            <p className="font-semibold">Free cancellation</p>
            <p className="font-semibold text-slate-500">
              Until 9:15 AM on October 23
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
