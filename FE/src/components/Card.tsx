'use client';
import { Heart, Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { usePathname } from 'next/navigation';
const styles = {
  container:
    'border-[1px] rounded-xl w-[280px] flex flex-col items-center justify-center ',
  adminContainer:
    'border-[1px] rounded-xl w-[266px] flex flex-col items-center justify-center ',
  imgContainer: 'w-[280px] h-[280px] relative rounded-t-xl overflow-hidden',
  adminImgContainer:
    'w-[266px] h-[266px] relative rounded-t-xl overflow-hidden',
  overlay: 'w-full h-full absolute bg-custom-gradient opacity-40 z-10',
  heart: 'absolute top-4 right-4 z-20 hover:fill-[#F4F5F6] cursor-pointer',
  rating: 'absolute top-4 left-4 z-20 flex items-center gap-2',
  titleContainer: 'p-3 flex flex-col gap-2 font-semibold ',
  button:
    'bg-white border-[1px] text-black rounded-full hover:bg-white px-4 py-2',
  priceContainer: 'w-full flex justify-between items-center',
};

const Card = ({
  title,
  price,
  rating,
  imgUrl,
}: {
  title: string;
  price: string;
  rating: string;
  imgUrl: string;
}) => {
  const pathname = usePathname();

  return (
    <div
      className={
        pathname == '/admin' ? styles.adminContainer : styles.container
      }
    >
      <div
        className={
          pathname == '/admin' ? styles.adminImgContainer : styles.imgContainer
        }
      >
        <Image src={imgUrl} alt="" fill objectFit="cover" />
        <div className={styles.overlay}></div>
        {pathname == '/admin' ? null : (
          <Heart className={styles.heart} color="#F4F5F6" />
        )}
        <div className={styles.rating}>
          <Star color="#F4F5F6" fill="#F4F5F6" size={16} />
          <p className="text-[#F4F5F6]">
            {rating.length == 1 ? rating + '.0' : rating}
          </p>
        </div>
      </div>
      <div className={styles.titleContainer}>
        <h1 className="text-[18px] ">{title}</h1>
        <div className={styles.priceContainer}>
          <h3 className="text-[20px]">{price}</h3>
          <div className={styles.button}>
            {pathname == '/admin' ? 'Edit' : 'Add to cart'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
