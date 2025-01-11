import Image from 'next/image';
import { Button } from './ui/button';
import { useRef } from 'react';
import { Input } from './ui/input';

interface ImageSelecterProps {
  imageUrls: string[];
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
  signedUrl: string | null;
  setSignedUrl: React.Dispatch<React.SetStateAction<string | null>>;
  editDialog?: boolean;
}

const ImageSelecter: React.FC<ImageSelecterProps> = ({
  imageUrls,
  setImageUrls,
  signedUrl,
  setSignedUrl,
  editDialog = false,
}) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleUploadUrl = async () => {
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: `${randomNumber}`,
          fileType: 'image/png',
        }),
      });
      const data = await response.json();
      setImageUrls((prev) => [...prev, data.fileName]);
      setSignedUrl(data.signedUrl);
    } catch (error) {
      console.error('Error fetching upload URL:', error);
    }
  };

  const handleUploadImg = async () => {
    if (!signedUrl || !formRef.current) return;

    const file = formRef.current.file.files[0];
    if (!file) {
      console.error('No file selected for upload.');
      return;
    }

    try {
      const res = await fetch(signedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      });
      if (res.ok) {
        console.log('Image uploaded successfully.');
      } else {
        console.error('Image upload failed:', res.statusText);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const previewImages =
    imageUrls.length > 0
      ? imageUrls.map((img) => img)
      : [
          'https://static.wixstatic.com/media/ea71bb_92c8a41554974578951b17ed811d4df6~mv2.png/v1/fill/w_2620,h_1540,q_90/ea71bb_92c8a41554974578951b17ed811d4df6~mv2.webp',
        ];

  return (
    <form ref={formRef} className="flex flex-col gap-5 h-full">
      <div
        className={
          editDialog
            ? 'relative w-[455px] h-[280px] rounded-lg overflow-hidden'
            : 'relative w-[480px] h-[380px] rounded-lg overflow-hidden'
        }
      >
        <Image
          src={previewImages[0]}
          alt="Preview"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <Input
          type="file"
          name="file"
          onChange={handleUploadUrl}
          className="absolute top-[40%] left-[25%] bg-white w-[250px] h-10"
        />
        <Button
          type="button"
          onClick={handleUploadImg}
          className={
            editDialog
              ? 'absolute top-[60%] left-[62%] bg-white text-black hover:bg-white'
              : 'absolute top-[55%] left-[60%] bg-white text-black hover:bg-white'
          }
        >
          Upload
        </Button>
      </div>
      <div
        className={
          editDialog
            ? 'flex gap-4 overflow-auto w-[4550px]'
            : 'flex gap-4 overflow-auto w-[480px]'
        }
      >
        {previewImages.map((src, index) => (
          <div
            key={index}
            className={
              editDialog
                ? 'min-w-[100px] h-[100px] relative rounded-lg overflow-hidden'
                : 'min-w-[200px] h-[200px] relative rounded-lg overflow-hidden'
            }
          >
            <Image
              src={src}
              alt={`Uploaded Image ${index + 1}`}
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
        ))}
      </div>
    </form>
  );
};

export default ImageSelecter;
