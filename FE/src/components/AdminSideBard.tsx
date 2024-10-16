import React from 'react';
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
} from 'lucide-react';
import Image from 'next/image';
type SideBarMenu = {
  [key: string]: React.ReactNode;
};
const sideBarMenu: SideBarMenu = {
  Insight: <ChartNoAxesCombined />,
  Products: <PackageOpen />,
  Orders: <NotebookPen />,
  Locations: <MapPin />,
  Contacts: <SquareUserRound />,
  Settings: <Settings />,
};
const AdminSideBard = ({
  handlerClick,
  isOpen,
}: {
  handlerClick: string;
  isOpen: boolean;
}) => {
  return (
    <div className="h-[850px] w-[400px] border-[1px] rounded-lg">
      <div className="flex items-center px-10 gap-3 py-5 border-b">
        <div className="size-[80px] rounded-full overflow-hidden relative">
          <Image
            src={
              'https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611704.jpg'
            }
            fill
            alt="avatar"
          />
        </div>
        <div className="flex  flex-col items-center">
          <h3 className="text-[18px] font-semibold">Hello</h3>
          <div className="flex items-center text-[#5fdba7]">
            <Dot strokeWidth={8} size={18} color="#5fdba7" />
            Online
          </div>
        </div>
      </div>
      <div className="py-5 px-10 border-b text-[18px] font-semibold">
        General
      </div>
      <div className="py-5 flex flex-col">
        {Object.keys(sideBarMenu).map((el) => (
          <>
            <div
              key={el}
              className="flex justify-between items-center cursor-pointer px-10 py-4 hover:bg-gray-100 rounded-lg"
            >
              <div className="flex items-center gap-4">
                {sideBarMenu[el]}
                <h3 className="font-medium">{el}</h3>
              </div>
              <div onClick={() => handlerClick(el)}>
                {isOpen && el == 'Products' ? (
                  <ChevronDown size={18} />
                ) : (
                  <ChevronRight size={18} />
                )}
              </div>
            </div>
            {isOpen && el == 'Products' && (
              <div className="flex flex-col gap-3 text-gray-500 pl-16 ">
                <h4 className="font-medium text-[14px] py-2 px-4">
                  category name
                </h4>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default AdminSideBard;
