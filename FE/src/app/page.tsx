import Subcategory from '@/components/Subcategory';
import React from 'react';
import MainPage from '../components/MainPage';
import Card from '@/components/Card';

export default function Home() {
  return (
    <div>
      <MainPage />
      <Subcategory />
      <Card />
    </div>
  );
}
