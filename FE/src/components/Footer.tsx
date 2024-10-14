import Link from 'next/link';
import React from 'react';
import { Facebook, Instagram, Twitter } from './Svgs';

const links = [
  {
    href: 'http://localhost:3000/',
    title: 'Нүүр',
  },

  {
    href: 'https://www.virginexperiencedays.co.uk/',
    title: 'Бидний тухай',
  },
  {
    href: '',
    title: 'Үйлчилгээний нөхцөл',
  },
  {
    href: '',
    title: 'Холбоо барих',
  },
  {
    href: '',
    title: 'Нууцлалын бодлого',
  },
];

export const Footer = () => {
  return (
    <div className="bg-[#F79A1F] relative items-center flex flex-col">
      <div className="z-10">
        <div className="py-[120px] max-w-[1258px] m-auto items-center flex flex-col gap-10">
          <div className="min-w-[1200px] flex justify-between">
            {links.map((link, i) => (
              <Link
                className="text-white font-semibold"
                key={link.title + i}
                href={link.href}
              >
                {link.title}
              </Link>
            ))}
          </div>
          <div className="flex gap-5 items-center">
            <Facebook />
            <Instagram />
            <Twitter />
          </div>
          <div className="w-full h-[1px] flex flex-col items-center">
            <p className="text-white">© 2024 Joy LLC </p>
            <p className="text-white">Зохиогчийн эрх хуулиар хамгаалагдсан.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
