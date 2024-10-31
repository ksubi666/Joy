import { CheckCircle } from 'lucide-react';
import OrderSheet from './OrderSheet';
interface Product {
  ProductId: {
    categoryId: string[];
    name: string;
    price: string;
    _id: string;
    image: string;
  };
}
interface Category {
  _id: string;
  name: string;
}
interface Review {
  _id: string;
  productId: { _id: string };
  createdAt: string;
  rating: number;
  review: string;
}
const SubtotalSection = ({
  totalPrice,
  cart,
  categories,
  reviews,
}: {
  totalPrice: string;
  cart: Product[];
  reviews: Review[];
  categories: Record<string, Category[]>;
}) => {
  return (
    <div className="mt-20 gap-4 border-[1px] border-slate-200 rounded-xl flex flex-col p-6 justify-center">
      <h1 className="font-bold text-[24px]">Total</h1>
      <p className="font-bold text-[30px] text-orange-500">{totalPrice}</p>
      <OrderSheet cart={cart} categories={categories} reviews={reviews} />
      <PaymentInfo />
    </div>
  );
};
const PaymentInfo = () => (
  <>
    <div className="flex items-center gap-4 p-6">
      <CheckCircle />
      <div>
        <p className="font-semibold">Pay nothing today</p>
        <p className="font-semibold text-slate-500">Book now and pay later</p>
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
  </>
);
export default SubtotalSection;
