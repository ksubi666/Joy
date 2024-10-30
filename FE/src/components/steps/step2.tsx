"use client";

import { Button } from "../ui/button";
import { Label } from "../ui/label";





export const Step2 = ({ inputData, debounceFn}) => {
  const email = {};
  return (
    <div className="w-[448px] p-8 m-auto flex flex-col gap-12">
      <p className="text-[28px] font-bold text-center">Нууц үг сэргээх</p>
      <div className="space-y-8">
        <p>{`Таны ${email} хаяг руу сэргээх код илгээх болно.`}</p>
        <div className="space-y-1">
          
          <Label>Нууц үг сэргээх код</Label>
        </div>
      </div>
      <Button title="Үргэлжлүүлэх" className={inputData} />
    </div>
  );
};
