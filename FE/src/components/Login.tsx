'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import image from '../assets/LoginImage.png';
import { axiosInstance } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { Switch } from './ui/switch';

export const styles = {
  container: 'w-full my-auto flex flex-col gap-[48px] pl-[100px] pr-[50px]',
  header: 'text-[#0D1118] flex flex-col text-center text-[32px] font-bold',
  form: 'flex flex-col items-start gap-4 w-full text-sm',
  inputContainer: 'flex flex-col gap-1 w-full text-sm',
  subContainer: 'flex flex-col w-full gap-8 items-center text-sm',
  input:
    'w-full flex items-center justify-between border-[#ECEDF0] border-[0.5px] bg-[#F7F7F8] text-[#8B8E95] rounded-[4px] pr-3',
  Button1:
    'w-full font-normal px-4 py-2 bg-[#F79A1F] text-white disabled:bg-[#EEEFF2] disabled:text-[#1C20243D] rounded-full h-12',
  Button2:
    'w-full bg-white border-[#F79A1F] border-[1px] text-[#272727] font-normal px-4 py-2 hover:bg-[#F79A1F] hover:text-white rounded-full h-12 flex items-center justify-center',
  borderOff: 'bg-[#F7F7F8] border-0',
};

const Login = () => {
  const [userType, setUserType] = useState<'user' | 'admin'>('admin');
  const [isHidePassword, setIsHidePassword] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const router = useRouter();

  const togglePasswordVisibility = () => setIsHidePassword((prev) => !prev);
  const Icon = isHidePassword ? EyeOff : EyeIcon;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserTypeToggle = () => {
    setUserType((prev) => (prev === 'admin' ? 'user' : 'admin'));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post('/auth/login', {
        email: formData.email,
        password: formData.password,
        role: userType,
      });

      if (response.status === 200) {
        setSuccess('Амжилттай нэвтэрлээ!');
        setError('');
        router.push('/?category=art%20Crafts');
      }
    } catch (error) {
      setError('Имэйл эсвэл нууц үг буруу! Дахин оролдоно уу.');
      console.error(error);
    }
  };

  return (
    <div className="w-[1000px] rounded-3xl border-[1px] h-[700px] grid grid-cols-2 overflow-hidden">
      <form className={styles.container} onSubmit={handleSubmit}>
        <div className={styles.header}>
          <h2>Нэвтрэх</h2>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <div className={styles.form}>
          <div className={styles.inputContainer}>
            <h3>Имэйл </h3>
            <Input
              onChange={handleOnChange}
              name="email"
              type="email"
              placeholder="Имэйл хаягаа оруулна уу"
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <h3>Нууц үг</h3>
            <div className={styles.input}>
              <Input
                onChange={handleOnChange}
                name="password"
                type={isHidePassword ? 'password' : 'text'}
                placeholder="Нууц үг"
                className={styles.borderOff}
                required
              />
              <Icon
                onClick={togglePasswordVisibility}
                className="cursor-pointer"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center mt-2">
                <Switch
                  checked={userType === 'admin'}
                  onClick={handleUserTypeToggle}
                />
                <p>{userType}</p>
              </div>
              <p className="text-end cursor-pointer">Нууц үг сэргээх</p>
            </div>
          </div>
        </div>
        <div className={styles.subContainer}>
          <Button
            type="submit"
            className={styles.Button1}
            disabled={!formData.email || !formData.password}
          >
            Нэвтрэх
          </Button>
          <p>Эсвэл</p>
          <Link href={'/signup'} type="button" className={styles.Button2}>
            Бүртгүүлэх
          </Link>
        </div>
      </form>
      <div className="relative h-[700px] w-[550px]">
        <Image fill src={image} alt="banner image" />
      </div>
    </div>
  );
};

export default Login;
