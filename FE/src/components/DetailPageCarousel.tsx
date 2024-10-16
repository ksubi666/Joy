import * as React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Image from 'next/image';

const imageUrl = [
  'https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/blt73a14fd074527a97/66f14fad5f331eb7fbd87785/BCS-2024-Dubai-Hot-Air-Balloon-Desktop.jpg?auto=webp&quality=60',
  'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
  'https://i0.wp.com/picjumbo.com/wp-content/uploads/silhouette-of-a-guy-with-a-cap-at-red-sky-sunset-free-image.jpeg?h=800&quality=80',
  'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
];
export function DetailPageCarousel({ setImageUrl }: { setImageUrl: string }) {
  const handlerClick = (el: string) => {
    setImageUrl(el);
  };
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="min-w-[600px] max-w-sm"
    >
      <CarouselContent className="overflow-auto">
        {imageUrl.map((el, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div>
              <Card>
                <CardContent
                  className="flex aspect-square items-center justify-center relative rounded-lg overflow-hidden"
                  onClick={() => handlerClick(el)}
                >
                  <Image
                    src={el}
                    fill
                    alt={''}
                    objectFit="cover"
                    objectPosition="center"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
