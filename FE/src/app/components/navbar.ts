'use client';

import { useRouter } from 'next/navigation';
import Cart from './Cart';
import LogoIcon from './icons/LogoIcon';
import SearchIcon from './icons/SearchIcon';
import UserIcon from './icons/UserIcon';
import { Input } from './ui/input';


const styles = {
  container: 'min-w-[1440px] h-[57px] flex flex-row justify-center bg-white',
  subContainer: 'min-w-[1258px] px-6 py-2 flex justify-between items-center',
  sidesContainer: 'flex items-center gap-2 cursor-pointer',
  contentContainer:
    'flex items-center gap-2 text-sm font-bold leading-4 spacing-[0,2px] px-4 py-2',
  input:
    'flex items-center px-4 py-2 gap-2 h-10 w-[260px] border-[#8B8E95] border-[1px] rounded-[8px]',
};
const content = {
  '': 'НҮҮР',
  menu: 'ХООЛНЫ ЦЭС',
  deliveryzone: 'ХҮРГЭЛТИЙН БҮС',
};

export const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.sidesContainer}>
          <div onClick={() => router.push('/')}>
            <LogoIcon />
          </div>
          <div className={styles.contentContainer}>
            {Object.values(content).map((menuItems, i) => (
              <p
                onClick={() =>
                  router.push(
                    Object.keys(content)[i] === 'menu'
                      ? `/menu?category=0`
                      : `/${Object.keys(content)[i]}`
                  )
                }
                className={styles.contentContainer}
              >
                {menuItems}
              </p>
            ))}
          </div>
        </div>
        <div className={styles.sidesContainer}>
          <div className={styles.input}>
            <SearchIcon />
            <Input className="border-0 h-fit" placeholder="Хайх" />
          </div>
          <Cart />
          {encodedToken ? (
            <div
              onClick={() => router.push('/profile')}
              className={styles.contentContainer}
            >
              <UserIcon color="#18BA51" />
              <p className="text-[#18BA51]">Хэрэглэгч</p>
            </div>
          ) : (
            <div
              onClick={() => router.push('/login')}
              className={styles.contentContainer}
            >
              <UserIcon />
              <p>Нэвтрэх</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
