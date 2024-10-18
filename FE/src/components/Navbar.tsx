import { CircleUserRound, Heart, Search, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import logo from '../assets/JOY.png';
import Link from 'next/link';

const styles = {
  container:
    'max-w-[1440px] h-[70px] bg-white text-black px-[120px] flex justify-between items-center mx-auto ',
  searchInput:
    'w-[280px] h-[44px] rounded-3xl border-[#DCDFE4] border-[1px] flex items-center justify-between py-2 px-4 gap-2',
  subContainer: 'flex items-center gap-10',
};

const Navbar = () => {
  return (
    <div className="border-b-[1px]">
      <nav className={styles.container}>
        <div className={`${styles.subContainer} gap-5`}>
          <Link
            href={`/?category=art%20Crafts`}
            className="w-[50px] h-[50px] relative"
          >
            <Image
              src={logo}
              alt="logo"
              fill
              objectFit="cover"
              objectPosition="center"
            />
          </Link>
          <div className={styles.searchInput}>
            <Search />
            <input type="text" className="w-full outline-none" />
          </div>
        </div>
        <div className={styles.subContainer}>
          <Link href={'/wishlist'}>
            <Heart />
          </Link>
          <Link href={'/cart'}>
            <ShoppingCart />
          </Link>
          <Link href={'/login'}>
            <CircleUserRound />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
