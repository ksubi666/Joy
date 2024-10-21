'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';



interface FormData {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  rePassword: string;
}

export const styles = {
  container:
    'w-[448px] h-fit rounded-[16px] flex flex-col gap-[48px] p-8 bg-white m-auto pb-20',
  header: 'text-[#0D1118] text-center text-[28px] font-bold',
  form: 'flex flex-col items-start gap-4 w-full text-sm',
  inputContainer: 'flex flex-col gap-1 w-full text-sm',
  subContainer: 'flex flex-col w-full gap-8 items-center text-sm',
  input:
    'w-full flex items-center justify-between border-[#ECEDF0] border-[0.5px] bg-[#F7F7F8] text-[#8B8E95] rounded-[4px] pr-3',
  Button1:
    'w-[380px] font-normal px-4 py-2 bg-[#F79A1F] text-white disabled:bg-[#EEEFF2] disabled:text-[#1C20243D] h-12',
  Button2:
    'w-[380px] bg-white border-[#EB4F47] border-[1px] text-[#272727] font-normal px-4 py-2 hover:bg-[#EB4F47] hover:text-white flex items-center justify-center rounded-lg h-12',
  borderOff: 'bg-[#F7F7F8] border-0',
};


export const Signup = () => {
  const [isHidePassword, setIsHidePassword] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
    rePassword: '',
  });

  const [error, setError] = useState<string>(''); 
  const [success, setSuccess] = useState<string>(''); 


  const togglePasswordVisibility = () => setIsHidePassword((prev) => !prev);
  const Icon = isHidePassword ? EyeOff : EyeIcon;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (formData.password !== formData.rePassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post('/api/auth/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
      });

      if (response.status === 200) {
        setSuccess("Амжилттай бүртгэгдлээ!");
        setError(''); 
      }
    } catch (error) {
      setError("Алдаа гарлаа! Дахин оролдоно уу.");
      console.error(error);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <h2>Бүртгүүлэх</h2>
      </div>
      {error && <p className="text-red-500">{error}</p>} 
      {success && <p className="text-green-500">{success}</p>} 
      <div className={styles.form}>
        <div className={styles.inputContainer}>
          <h3>Нэр</h3>
          <Input
            onChange={handleOnChange}
            name="name"
            type="text"
            placeholder="Нэрээ оруулна уу"
            className={styles.input}
            required
          />
        </div>
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
          <h3>Утасны дугаар</h3>
          <Input
            onChange={handleOnChange}
            name="phoneNumber"
            type="string"
            placeholder="Та утасны дугаараа оруулна уу"
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
          <div className={styles.inputContainer}>
            <h3>Нууц үг давтах</h3>
            <div className={styles.input}>
              <Input
                onChange={handleOnChange}
                name="rePassword"
                type={isHidePassword ? 'password' : 'text'}
                placeholder="Нууц үгээ оруулна уу"
                className={styles.borderOff}
                required
              ></Input>
              <Icon
                onClick={togglePasswordVisibility}
                className="cursor-pointer"
              />
            </div>
          </div>
          <p className="text-end cursor-pointer">Нууц үг сэргээх</p>
        </div>
      </div>
      <div className={styles.subContainer}>
        <Button
          type="submit"
          className={styles.Button1}
          disabled={
            formData.email.length > 0 &&
            formData.password.length > 0 &&
            formData.name.length > 0 &&
            formData.phoneNumber.length > 0 &&
            formData.rePassword.length > 0
              ? false
              : true
          }
        >
          Бүртгүүлэх
        </Button>
        <p>Эсвэл</p>
        <Link href={'/login'} type="button" className={styles.Button2}>
          Нэвтрэх
        </Link>
      </div>
    </form>
  );
};


