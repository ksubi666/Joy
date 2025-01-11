import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { Dispatch } from 'react';

interface DetailPageCarouselProps {
  setImageUrl: Dispatch<React.SetStateAction<string>>;
  productImage: string[];
}

export const DetailPageCarousel: React.FC<DetailPageCarouselProps> = ({
  setImageUrl,
  productImage,
}) => {
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
        {productImage &&
          productImage.map((el, index) => (
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
};
