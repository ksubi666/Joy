import dynamic from 'next/dynamic';

// import ProductDetail from '@/components/ProductDetail';
const ProductDetail = dynamic(() => import('@/components/ProductDetail'), {
  ssr: false,
});
const page = () => {
  return <ProductDetail />;
};

export default page;
