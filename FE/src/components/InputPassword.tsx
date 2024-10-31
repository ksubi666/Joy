'use client';

import { useState } from 'react';
import { Input } from './ui/input';

interface InputPasswordProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder?: string;
}

export const InputPassword: React.FC<InputPasswordProps> = ({
  onChange,
  name,
  placeholder,
}) => {
  const [passwordIsShown, setPasswordIsShown] = useState(false);

  const handleClick = () => {
    setPasswordIsShown((prev) => !prev);
  };

  return (
    <div className="relative">
      <Input
        onChange={onChange}
        name={name}
        className="bg-[#F7F7F8] px-4 py-2 h-12 border-none shadow-none placeholder:text-[#8B8E95]"
        type={passwordIsShown ? 'text' : 'password'}
        placeholder={placeholder}
      />
      <div
        className="px-4 py-3 absolute right-0 top-0 cursor-pointer"
        onClick={handleClick}
      >
        {passwordIsShown ? 'Hide' : 'Show'}{' '}
      </div>
    </div>
  );
};
