
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Profile = () => {
  return (
    
      <div className=" flex flex-col  mx-auto items-center w-[450px] py-[20px] gap-8">
        <Input placeholder="Таны нэр"></Input>
        <Input placeholder="Утасны дугаар"></Input>
        <Input placeholder="Имэйл хаяг"></Input>
        <Button className=" w-[450px] bg-[#EB4F47]">Хадгалах</Button>
    
    </div>
  );
};

export default Profile;
