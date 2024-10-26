'use client';
import Cart from '@/components/Cart';

const page = () => {
  return (
    <div className="max-w-[1440px] px-[120px] mx-auto flex flex-col gap-5 pt-7 pb-20 h-fit">
      <h1 className="text-[25px] font-bold">Wishlist</h1>
      <Cart
        category="Sports"
        title="O2 Arena Rooftop Climbing Experience"
        rating="5"
        price="789,000₮"
        comment={303}
      />
    </div>
  );
};

export default page;
