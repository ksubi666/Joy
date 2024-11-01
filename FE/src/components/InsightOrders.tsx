import { Button } from './ui/button';
export const styles = {
  statusButton:
    'h-7 font-semibold rounded-full bg-white border-[1px] border-[#F79A1F] hover:bg-white text-[#F79A1F]',
  titleContainer:
    'w-full min-h-14 grid grid-cols-5 border-b text-[14px] font-semibold',
  subContainer: 'flex pl-4 items-center',
  orderContainer: 'w-full h-fit grid grid-cols-5 border-b text-[14px] ',
};
const InsightOrders = ({
  userName,
  phoneNumber,
  date,
  createdAt,
  time,
  orderNumber,
  status,
}: {
  userName: string;
  phoneNumber: string;
  date: string;
  time: string;
  createdAt: string;
  orderNumber: string;
  status: string;
}) => {
  return (
    <div className={styles.orderContainer}>
      <div className={styles.subContainer}>#{orderNumber}</div>
      <div className="flex p-4 flex-col items-start gap-1">
        <h3 className="capitalize font-medium">{userName}</h3>
        <p>{phoneNumber}</p>
      </div>
      <div className={styles.subContainer}>{date + '-' + time}</div>
      <div className={styles.subContainer}>
        <Button className={styles.statusButton}>{status}</Button>
      </div>
      <div className={styles.subContainer}>{createdAt + ' 00:00'}</div>
    </div>
  );
};

export default InsightOrders;
