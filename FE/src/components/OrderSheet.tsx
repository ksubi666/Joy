import { useRef, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { formatPrice } from './Card';
import Cart from './Cart';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Input } from './ui/input';
import { DatePickerDemo } from './DatePicker';
import { Button } from './ui/button';
import { TimeSelect } from './TimeSelect';
import { axiosInstance } from '@/lib/axios';
import { useRouter } from 'next/navigation';
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
interface DecodedToken {
  _doc: {
    _id: string;
  };
}
const OrderSheet = ({
  cart,
  categories,
  reviews,
}: {
  cart: Product[];
  categories: Record<string, Category[]>;
  reviews: Review[];
}) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [user, setUser] = useState<DecodedToken | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie;
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      setUser(decodedToken);
    } catch (error) {
      console.error('Invalid token:', error);
      setUser(null);
    }
  }, []);
  const calculateAverageRating = (productId: string) => {
    const productReviews = reviews.filter(
      (review) => review.productId._id === productId
    );
    const totalRating = productReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return productReviews.length > 0
      ? (totalRating / productReviews.length).toFixed(1)
      : '0';
  };
  const currentReviewCount = (productId: string) => {
    return reviews.filter((review) => review.productId._id === productId)
      .length;
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formRef.current || !user) {
      console.error('Form reference is null or user is not authenticated');
      return;
    }
    const cartId = localStorage.getItem('cartId');
    const timeInput = formRef.current[3] as HTMLInputElement;
    const phoneInput = formRef.current[0] as HTMLInputElement;
    const time = timeInput.value;
    const phone = phoneInput.value;
    const products = cart.map((product) => product.ProductId._id);
    await axiosInstance.post('/order/create', {
      cartId: cartId,
      userId: user._doc._id,
      products: products,
      date: date,
      time: time,
      phone: phone,
    });
    localStorage.removeItem('cartId');
    router.push('/');
  };
  return (
    <Sheet>
      <SheetTrigger className="rounded-3xl max-w-[400px] bg-[#EB4F47] text-white font-bold text-[18px] py-2 px-8 justify-center flex">
        Order now
      </SheetTrigger>
      <SheetContent className="min-w-[400px] overflow-auto flex flex-col gap-2">
        <SheetHeader>
          <SheetTitle className="font-bold text-[18px]">Products</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-1 h-[310px] overflow-auto">
          {cart.map((el) => {
            const categoryName =
              categories[el.ProductId.categoryId[0]]?.[0]?.name || 'Unknown';
            return (
              <Cart
                isOrder={true}
                id={el.ProductId._id}
                key={el.ProductId._id}
                image={el.ProductId.image[0]}
                category={categoryName}
                title={el.ProductId.name}
                rating={calculateAverageRating(el.ProductId._id)}
                price={formatPrice(Number(el.ProductId.price))}
                comment={currentReviewCount(el.ProductId._id)}
              />
            );
          })}
        </div>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          <h3 className="text-[18px] font-bold">Order Information</h3>
          <div className="flex flex-col gap-2">
            <p>Phone number</p>
            <Input required />
          </div>
          <div className="flex flex-col gap-2">
            <p>Pick a date</p>
            <div className="grid grid-cols-2 gap-2">
              <DatePickerDemo date={date} setDate={setDate} />
              <TimeSelect />
            </div>
          </div>
          <Button type="submit" className="h-12 mt-2 rounded-full">
            Create order
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};
export default OrderSheet;
