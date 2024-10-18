import { Button } from './ui/button';
export const styles = {
  statusButton:
    'h-7 font-semibold rounded-full bg-white border-[1px] border-[#F79A1F] hover:bg-white text-[#F79A1F]',
  titleContainer:
    'w-full min-h-14 grid grid-cols-5 border-b text-[14px] font-semibold',
  subContainer: 'flex pl-4 items-center',
  orderContainer: 'w-full h-fit grid grid-cols-5 border-b text-[14px] ',
};
const InsightOrders = () => {
  return (
    <div className={styles.orderContainer}>
      <div className={styles.subContainer}>#123123</div>
      <div className="flex p-4 flex-col items-start">
        <h3>name</h3>
        <p>89898989</p>
      </div>
      <div className={styles.subContainer}>October 13, 2014 11:13:00</div>
      <div className={styles.subContainer}>
        <Button className={styles.statusButton}>status</Button>
      </div>
      <div className={styles.subContainer}>October 13, 2014 11:13:00</div>
    </div>
  );
};

export default InsightOrders;
