'use client';

import { axiosInstance } from '@/lib/axios';
import { jwtDecode } from 'jwt-decode';
import { Heart, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const styles = {
  container:
    'border-[1px] rounded-xl w-[280px] flex flex-col items-center justify-between',
  adminContainer:
    'border-[1px] rounded-xl w-[266px] flex flex-col items-center justify-center',
  imgContainer: 'w-[280px] h-[280px] relative rounded-t-xl overflow-hidden',
  adminImgContainer:
    'w-[266px] h-[266px] relative rounded-t-xl overflow-hidden',
  overlay: 'w-full h-full absolute bg-custom-gradient opacity-40 z-10',
  heart: 'absolute top-4 right-4 z-20 hover:fill-[#F4F5F6] cursor-pointer',
  rating: 'absolute top-4 left-4 z-20 flex items-center gap-2',
  titleContainer:
    'p-3 flex flex-col gap-2 font-semibold w-full min-h-[150px] justify-between',
  button:
    'bg-white border-[1px] text-black rounded-full hover:bg-white px-4 py-2',
  priceContainer: 'w-full flex justify-between items-center',
};

export const formatPrice = (price: number) => {
  return `${new Intl.NumberFormat('de-DE').format(price)} ₮`;
};

interface UserDoc {
  _id: string;
  name: string;
}

const Card = ({
  title,
  price,
  rating,
  imgUrl,
  product,
}: {
  title: string;
  price: string;
  rating: string;
  imgUrl: string;
  product: string | '';
}) => {
  const pathname = usePathname();
  const token = document.cookie;

  let user: UserDoc | null = null;
  try {
    const { _doc }: { _doc: UserDoc } = jwtDecode(token);
    user = _doc;
  } catch (error) {
    console.error('Token decoding error:', error);
  }

  const handlerCart = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (user) {
      const { data } = await axiosInstance.post('/cart/create', {
        productId: product,
        userId: user._id,
        _id: localStorage.getItem('cartId') || null,
      });
      localStorage.setItem('cartId', data._id);
    }
  };

  const handlerWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (user) {
      const { data } = await axiosInstance.post('/wishlist/create', {
        productId: product,
        userId: user._id,
        _id: localStorage.getItem('wishlistId') || null,
      });
      localStorage.setItem('wishlistId', data._id);
    }
  };

  return (
    <Link
      href={`/detailpage?product=${product}`}
      className={
        pathname === '/admin' ? styles.adminContainer : styles.container
      }
    >
      <div
        className={
          pathname === '/admin' ? styles.adminImgContainer : styles.imgContainer
        }
      >
        <Image src={imgUrl} alt={title} fill objectFit="cover" />
        <div className={styles.overlay}></div>
        {pathname !== '/admin' && (
          <>
            <div onClick={handlerWishlist}>
              <Heart className={styles.heart} color="#F4F5F6" />
            </div>
            <div className={styles.rating}>
              <Star color="#F4F5F6" fill="#F4F5F6" size={16} />
              <p className="text-[#F4F5F6]">
                {rating.length === 1 ? `${rating}.0` : rating}
              </p>
            </div>
          </>
        )}
      </div>
      <div className={styles.titleContainer}>
        <h1 className="text-[18px]">{title}</h1>
        <div className={styles.priceContainer}>
          <h3 className="text-[20px]">{formatPrice(Number(price))}</h3>
          <div onClick={handlerCart} className={styles.button}>
            {pathname === '/admin' ? 'Edit' : 'Add to cart'}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
