'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface FormData {
  email: string;
  password: string;
}

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
    'w-full bg-white border-[#F79A1F] border-[1px] text-[#272727] font-normal px-4 py-2 hover:bg-[#F79A1F] hover:text-white rounded-full h-12',
  borderOff: 'bg-[#F7F7F8] border-0',
};

const Login = () => {
  const [isHidePassword, setIsHidePassword] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
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
        <h2>Нэвтрэх</h2>
      </div>
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
          <p className="text-end cursor-pointer">Нууц үг сэргээх</p>
        </div>
      </div>
      <div className={styles.subContainer}>
        <Button
          type="submit"
          className={styles.Button1}
          disabled={
            formData.email.length > 0 && formData.password.length > 0
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

export default Login;
