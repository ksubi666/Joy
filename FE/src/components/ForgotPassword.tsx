"use client";

import { useMemo, useState } from "react";
import _ from "lodash";
import { Step1 } from "./steps/step1";
import { Step2 } from "./steps/step2";
import { Step3 } from "./steps/step3";

export const ForgotPassword = () => {
  const [inputData, setInputData] = useState("");

  const handleOnchange = (event) => {
    setInputData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const debounceFn = useMemo(() => _.debounce(handleOnchange, 500), []);

  return (
    <div>
      
      <Step1 inputData={inputData} debounceFn={debounceFn} />
      <Step2 inputData={inputData} debounceFn={debounceFn}/>
      <Step3 />
    </div>
  );
};
