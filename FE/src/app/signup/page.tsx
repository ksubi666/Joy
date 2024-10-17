'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface FormData {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  rePassword: string;
}

export const styles = {
  container:
    'w-[448px] h-fit rounded-[16px] flex flex-col gap-[48px] p-8 bg-white m-auto pt-[143px] pb-[107px]',
  header: 'text-[#0D1118] text-center text-[28px] font-bold',
  form: 'flex flex-col items-start gap-4 w-full text-sm',
  inputContainer: 'flex flex-col gap-1 w-full text-sm',
  subContainer: 'flex flex-col w-full gap-8 items-center text-sm',
  input:
    'w-full flex items-center justify-between border-[#ECEDF0] border-[0.5px] bg-[#F7F7F8] text-[#8B8E95] rounded-[4px] pr-3',
  Button1:
    'w-[380px] font-normal px-4 py-2 bg-[#F79A1F] text-white disabled:bg-[#EEEFF2] disabled:text-[#1C20243D]',
  Button2:
    'w-[380px] bg-white border-[#EB4F47] border-[1px] text-[#272727] font-normal px-4 py-2 hover:bg-[#EB4F47] hover:text-white',
  borderOff: 'bg-[#F7F7F8] border-0',
};

const SignupPage = () => {
  const [isHidePassword, setIsHidePassword] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
    rePassword: '',
  });

  const togglePasswordVisibility = () => setIsHidePassword((prev) => !prev);
  const Icon = isHidePassword ? EyeOff : EyeIcon;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form className={styles.container}>
      <div className={styles.header}>
        <h2>Бүртгүүлэх</h2>
      </div>
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
          Нэвтрэх
        </Button>
        <p>Эсвэл</p>
        <Button type="button" className={styles.Button2}>
          Бүртгүүлэх
        </Button>
      </div>
    </form>
  );
};

export default SignupPage;
