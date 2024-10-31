'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Heart } from 'lucide-react';
import Map from '@/components/Map';
import { DetailPageCarousel } from './DetailPageCarousel';
import { useSearchParams } from 'next/navigation';
import { axiosInstance } from '@/lib/axios';
import { formatPrice } from './Card';
import ReviewRating from './Review';
import { jwtDecode } from 'jwt-decode';

interface Category {
  name: string;
}

interface Product {
  name: string;
  price: string;
  image: string[];
  _id: string;
  categoryId: Category[];
  description: string;
  location: [number, number];
}
interface DecodedToken {
  _doc: {
    _id: string;
  };
}
const ProductDetail: React.FC = () => {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const searchParams = useSearchParams();
  const productId = searchParams.get('product');
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const token = document.cookie;
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      setUser(decodedToken);
    } catch (error) {
      console.error('Invalid token:', error);
      setUser(null);
    }
  }, []);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axiosInstance.get<Product[]>(
          '/product/getProducts'
        );
        const filteredProduct = data.filter(
          (product) => product._id === productId
        );
        if (filteredProduct.length > 0) {
          setProducts(filteredProduct);
          setImageUrl(filteredProduct[0].image[0]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    getProducts();
  }, [productId]);
  const handlerCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (user) {
      const { data } = await axiosInstance.post('/cart/create', {
        productId: products[0]._id,
        userId: user._doc._id,
        _id: localStorage.getItem('cartId') || null,
      });
      localStorage.setItem('cartId', data._id);
    }
  };
  const handlerWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (user) {
      const { data } = await axiosInstance.post('/wishlist/create', {
        productId: products[0]._id,
        userId: user._doc._id,
        _id: localStorage.getItem('wishlistId') || null,
      });
      localStorage.setItem('wishlistId', data._id);
    }
  };
  return (
    <>
      {products.map((product) => (
        <div
          key={product._id}
          className="grid grid-cols-2 w-[1200px] mx-auto py-10 gap-28"
        >
          <div className="flex flex-col gap-4 items-center">
            <div className="relative w-[600px] h-[600px] rounded-lg overflow-hidden">
              <Image
                src={`https://pub-085cb38b95fb4b51936e3f399499e3cd.r2.dev/joy/${imageUrl}`}
                fill
                alt={product.name}
                objectFit="cover"
              />
            </div>
            <DetailPageCarousel
              setImageUrl={setImageUrl}
              productImage={product.image}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {product.categoryId.map((category) => (
                <Button
                  key={category.name}
                  className="rounded-full h-[24px] px-3 py-2 bg-[#EB4F47] hover:bg-[#EB4F47] font-bold w-fit capitalize"
                >
                  {category.name}
                </Button>
              ))}
            </div>
            <h1 className="text-[32px] font-semibold">{product.name}</h1>
            <div className="flex flex-col gap-3">
              <p className="font-bold text-[28px]">
                Price: {formatPrice(Number(product.price))}
              </p>
              <div className="flex w-full items-center gap-7">
                <div className="cursor-pointer" onClick={handlerWishlist}>
                  <Heart size={30} className="hover:fill-black" />
                </div>
                <Button
                  onClick={handlerCart}
                  className="bg-[#EB4F47] hover:bg-[#EB4F47] font-bold w-full h-12"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-[18px] font-semibold">Description</h3>
              <p className="font-medium">{product.description}</p>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-[18px] font-semibold">Location</h3>
              <div className="rounded-lg w-full h-[250px] overflow-hidden">
                <Map
                  center={product.location}
                  location={null}
                  setLocation={null}
                  position={products}
                />
              </div>
            </div>
            <ReviewRating />
          </div>
        </div>
      ))}
    </>
  );
};
export default ProductDetail;
