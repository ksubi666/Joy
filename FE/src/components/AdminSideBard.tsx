'use client';

import React, { useEffect, useState } from 'react';
import {
  ChartNoAxesCombined,
  ChevronDown,
  ChevronRight,
  Dot,
  MapPin,
  NotebookPen,
  PackageOpen,
  Settings,
  SquareUserRound,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { axiosInstance } from '@/lib/axios';
import { jwtDecode } from 'jwt-decode';

const styles = {
  container: 'h-[850px] w-[400px] border-[1px] rounded-lg',
  avatarContainer: 'flex items-center px-10 gap-3 py-5 border-b',
  avatarImage:
    'size-[80px] rounded-full overflow-hidden relative bg-gray-200 flex items-end justify-center',
  avatarSubConatiner: 'flex flex-col items-center',
  avatarStatusText: 'flex items-center text-[#5fdba7]',
  avatarName: 'text-[18px] font-semibold capitalize',
  general: 'py-5 px-10 border-b text-[18px] font-semibold',
  menuContainer:
    'flex justify-between items-center cursor-pointer px-10 py-4 hover:bg-gray-100 rounded-lg',
  menuItem: 'flex items-center gap-4',
  selectedMenuItem: 'flex items-center gap-4 text-[#F79A1F]',
  categoryListContainer: 'flex flex-col gap-3 text-gray-500 pl-16 ',
  categoryName: 'font-medium text-[14px] px-4 capitalize',
};

interface Category {
  _id: string;
  name: string;
}

type SideBarMenu = {
  [key: string]: React.ReactNode;
};

const sideBarMenu: SideBarMenu = {
  Insight: <ChartNoAxesCombined />,
  Categories: <PackageOpen />,
  Orders: <NotebookPen />,
  Locations: <MapPin />,
  Contacts: <SquareUserRound />,
  Settings: <Settings />,
};
interface docType {
  name: string;
}
const AdminSideBard: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const token = document.cookie;
  const { _doc }: { _doc: docType } = jwtDecode(token);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await axiosInstance.get('/category/getCategories');
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    getCategories();
  }, []);

  const searchParams = useSearchParams();
  const menu = searchParams.get('menu');

  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatarImage}>
          <User color="#6b7280" size={70} />
        </div>
        <div className={styles.avatarSubConatiner}>
          <h3 className={styles.avatarName}>{_doc.name}</h3>
          <span className={styles.avatarStatusText}>
            <Dot strokeWidth={8} size={18} color="#5fdba7" />
            Online
          </span>
        </div>
      </div>
      <div className={styles.general}>General</div>
      <div className="py-5 flex flex-col">
        {Object.keys(sideBarMenu).map((el) => (
          <React.Fragment key={el}>
            <div className={styles.menuContainer}>
              <div
                className={
                  menu === el ? styles.selectedMenuItem : styles.menuItem
                }
              >
                {sideBarMenu[el]}
                <h3 className="font-medium">{el}</h3>
              </div>
              <Link href={`/admin?menu=${el}`}>
                {menu === 'Categories' && el === 'Categories' ? (
                  <ChevronDown
                    size={18}
                    color={menu === el ? '#F79A1F' : 'black'}
                  />
                ) : (
                  <ChevronRight
                    size={18}
                    color={menu === el ? '#F79A1F' : 'black'}
                  />
                )}
              </Link>
            </div>
            {menu === 'Categories' && el === 'Categories' && (
              <div className={styles.categoryListContainer}>
                {categories.map((category) => (
                  <h4 key={category._id} className={styles.categoryName}>
                    {category.name}
                  </h4>
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default AdminSideBard;
