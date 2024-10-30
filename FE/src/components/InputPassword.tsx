"use client"

import { useState } from "react"
import { Input } from "./ui/input"



export const InputPassword = (props) => {
    const [passwordIsShown, setPasswordIsShown] = useState(false)
    const handleClick = () => {
        setPasswordIsShown(!passwordIsShown)
    }
  return (
    <div className="relative">
        
    <Input
      onChange={props.onChange}
      name={props.name}
      className="bg-[#F7F7F8] px-4 py-2 h-12 border-none shadow-none placeholder:text-[#8B8E95]"
      type={passwordIsShown ? "text" : "password"}
      placeholder={props.placeholder}
    />
    <div
      className="px-4 py-3 absolute right-0 top-0"
      onClick={handleClick}
  
    >
    </div>
    </div>
  )
}
