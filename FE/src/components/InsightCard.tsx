import { MoveUpRight } from 'lucide-react';
import React from 'react';

const InsightCard = ({ title, count }: { title: string; count: string }) => {
  return (
    <div className="border-[1px] rounded-lg flex flex-col justify-between overflow-hidden">
      <div>
        <h3 className="text-[18px] font-semibold py-2 px-6 border-b">
          {title}
        </h3>
        <div className="flex justify-center items-center text-[28px] px-6 py-2 font-semibold">
          {count}
        </div>
      </div>
      <div className="flex items-center bg-gray-100 w-full py-2 px-6 border-t gap-3">
        <div className="flex gap-1 items-center text-[#01C08F]">
          <MoveUpRight size={16} />
          <p>10%</p>
        </div>
        <p className="text-[14px] text-gray-600">from last month</p>
      </div>
    </div>
  );
};

export default InsightCard;
