import Card from '@/components/Card';
import Subcategory from '@/components/Subcategory';
import Image from 'next/image';
import React from 'react';
import MainPage from '../components/MainPage'; 

export default function Home() {
  return (
    <div>
       <MainPage />
        <Subcategory />
    </div>
  );
}

