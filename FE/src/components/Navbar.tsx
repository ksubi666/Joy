import { CircleUserRound, Heart, Search, ShoppingCart } from 'lucide-react';
import React from 'react';

const styles = {
  container:
    'w-[1440px] h-[70px] bg-white text-black px-[120px] flex justify-between items-center',
  searchInput:
    'w-[280px] h-[44px] rounded-3xl border-[#DCDFE4] border-[1px] flex items-center justify-between py-2 px-4 gap-2',
  subContainer: 'flex items-center gap-10',
};

const Navbar = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.subContainer}>
        <div>logo</div>
        <div className={styles.searchInput}>
          <Search />
          <input type="text" className="w-full outline-none" />
        </div>
      </div>
      <div className={styles.subContainer}>
        <Heart />
        <ShoppingCart />
        <CircleUserRound />
      </div>
    </nav>
  );
};

export default Navbar;
