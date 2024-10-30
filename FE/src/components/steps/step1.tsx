"use client"


import { Input } from "@/components/ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"




export const Step1 = ( {inputData, debounceFn} ) => {
  return (
    <div className="w-[448px] p-8 m-auto flex flex-col gap-12">
        <p className="text-[28px] font-bold text-center">Нууц үг сэргээх</p>
        <div>
          
          <Label>Имэйл</Label>
            <Input onChange={debounceFn} name="email" className="h-12 bg-[#F7F7F8]" placeholder="Имэйл хаягаа оруулна уу"/>
        </div>
        
        <Button title="Үргэлжлүүлэх" className={inputData}/>
    </div>
  )
}
