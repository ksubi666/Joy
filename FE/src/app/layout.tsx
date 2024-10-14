import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Open_Sans } from 'next/font/google';

const OpenSans = Open_Sans({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'Joy',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${OpenSans.className} antialiased`}>
        <div className="min-h-screen w-full">
          <Navbar />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
