import ErrorIcon from '@/icons/ErrorIcon';

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-[150px]">
      <ErrorIcon />
      <h1 className="text-[30px] text-[#3a3f4f]">404 NOT FOUND</h1>
    </div>
  );
};

export default Error;
