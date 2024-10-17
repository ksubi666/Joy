import Subcategory from '@/components/Subcategory';
import MainPage from '../components/MainPage';
import Card from '@/components/Card';
import ProductDetail from '@/components/ProductDetail';
import React from 'react';
import SignupPage from './signup/page';
import LoginPage from './login/page';
import Wishlist from './wishlist/page';

export default function Home() {
  return (
    <div>
      {/* <MainPage />
      <Subcategory />
      <Card
        title="Ghost, Ghouls and Gallows Walking Tour with Boat Ride"
        price="100000"
        rating="4"
      />  */}
      {/* <ProductDetail /> */}
      {/* <LoginPage />
      <SignupPage /> */}
      <Wishlist 
      category="Adventure"
      title="Ghost, Ghouls and Gallows Walking Tour with Boat Ride"
      time="2 цаг"
      rating="5"
      price="657,800₮"
      count={999}
      />
    </div>
  );
}
