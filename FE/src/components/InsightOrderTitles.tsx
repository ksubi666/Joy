import { styles } from './InsightOrders';

const InsightOrderTitles = () => {
  return (
    <div className={styles.titleContainer}>
      <div className={styles.subContainer}>Order number</div>
      <div className={styles.subContainer}>User info</div>
      <div className={styles.subContainer}>Appointment time</div>
      <div className="flex pl-8 items-center">Status</div>
      <div className={styles.subContainer}>created date</div>
    </div>
  );
};

export default InsightOrderTitles;
