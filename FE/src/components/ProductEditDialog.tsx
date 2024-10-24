import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Card from './Card';
import { Input } from './ui/input';
import { CategorySelecter } from './CategorySelecter';
import { Textarea } from './ui/textarea';
import { useRef, useState } from 'react';
import Map from './Map';
import { axiosInstance } from '@/lib/axios';
import ImageSelecter from './ImageSelecter';
const styles = { editContainer: 'flex flex-col gap-2 font-medium' };
const ProductEditDialog = ({
  _id,
  title,
  price,
  rating,
  imgUrl,
  description,
  discount,
  productLocation,
}: {
  _id: string;
  title: string;
  price: string;
  rating: string;
  imgUrl: string;
  description: string;
  discount: string;
  productLocation: [number, number];
}) => {
  const formRef = useRef();
  const [category, setCategory] = useState();
  const [location, setLocation] = useState(productLocation);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<Array<string>>([]);

  const handlerClick = async () => {
    await axiosInstance.put(`/product/productUpdate/${_id}`, {
      name: formRef.current[0].value,
      description: formRef.current[1].value,
      price: formRef.current[2].value,
      discount: formRef.current[3].value,
      categoryId: category,
      location: location,
      image: imageUrls,
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-start">
        <Card title={title} price={price} imgUrl={imgUrl} rating={rating} />
      </AlertDialogTrigger>
      <AlertDialogContent className="min-w-[1000px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Edit product</AlertDialogTitle>
        </AlertDialogHeader>
        <form ref={formRef} className="grid grid-cols-2 gap-10">
          <div className="flex flex-col gap-3">
            <div className={styles.editContainer}>
              <h3>Title</h3>
              <Input placeholder={title} />
            </div>
            <div className={styles.editContainer}>
              <h3>Description</h3>
              <Textarea className="min-h-[270px]" placeholder={description} />
            </div>
            <div className={styles.editContainer}>
              <h3>Price</h3>
              <Input placeholder={price + '₮'} />
            </div>
            <div className={styles.editContainer}>
              <h3>Discount</h3>
              <Input placeholder={discount + '%'} />
            </div>
            <div className={styles.editContainer}>
              <h3>Category</h3>
              <CategorySelecter setCategory={setCategory} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className={styles.editContainer}>
              <h3>Category</h3>
              <ImageSelecter
                editDialog={true}
                imageUrls={imageUrls}
                setImageUrls={setImageUrls}
                signedUrl={signedUrl}
                setSignedUrl={setSignedUrl}
              />
            </div>

            <div className={styles.editContainer}>
              <h3>Location</h3>
              <div className="w-[455px] h-[200px] rounded-lg overflow-hidden">
                <Map
                  location={location}
                  center={location}
                  setLocation={setLocation}
                />
              </div>
            </div>
          </div>
        </form>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handlerClick}
            className="bg-[#F79A1F] hover:bg-[#F79A1F]"
          >
            Save
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default ProductEditDialog;
