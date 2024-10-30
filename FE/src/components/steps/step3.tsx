"use client";

import { useMemo, useState } from "react";

import { toast, ToastContainer } from "react-toastify";
import { Label } from "../ui/label";
import { InputPassword } from "../InputPassword";
import { Button } from "../ui/button";

const buttonStyles = {
  empty: "bg-[#18BA51] text-white w-full h-12",
  notEmpty: "bg-[#EEEFF2] text-[#1C20243D] h-12 w-full",
};

export const Step3 = () => {
  const notify = () => toast.success('Нууц үг амжилттай солигдлоо', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });;

  const [error, setError] = useState("");
  const [inputData, setInputData] = useState({ password: "", rePassword: "" });

  const handleOnchange = (event) => {
    setInputData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleClick = () => {
    if (inputData.password !== inputData.rePassword) {
      setError("password not match");
    } else if (
      inputData.password.length > 0 &&
      inputData.rePassword.length > 0
    ) {
      setError("Нууц үг амжилттай солигдлоо");
    }
  };

  const debounceFn = useMemo(() => _.debounce(handleOnchange, 500), []);

  return (
    <div className="w-[448px] p-8 m-auto flex flex-col gap-12">
      <p className="text-[28px] font-bold text-center">Шинэ нууц үг зохиох </p>
      <div className="space-y-6">
    
        <div className="space-y-1">
          <Label>Нууц үг </Label>
          <InputPassword
            onChange={debounceFn}
            name="password"
            className="h-12 bg-[#F7F7F8]"
            placeholder="**********"
          />
        </div>
        <div className="space-y-1">
          <Label>Нууц үг давтах </Label>
          <InputPassword
            onChange={debounceFn}
            name="rePassword"
            className="h-12 bg-[#F7F7F8]"
            placeholder="**********"
          />
        </div>
      </div>
      <div>
        <Button
          className={
            inputData.password.length > 0 && inputData.rePassword.length > 0
              ? buttonStyles.empty
              : buttonStyles.notEmpty
          }
          onClick={notify}
        >
          Үргэлжлүүлэх
        </Button>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
      <p>{error}</p>
    </div>
  );
};
