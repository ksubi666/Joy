import { styles } from './InsightOrders';

const InsightOrderTitles = () => {
  return (
    <div className={styles.titleContainer}>
      <div className={styles.subContainer}>Order number</div>
      <div className={styles.subContainer}>User info</div>
      <div className={styles.subContainer}>tovlogdson udur</div>
      <div className="flex pl-8 items-center">status</div>
      <div className={styles.subContainer}>hudaldaj avsn date</div>
    </div>
  );
};

export default InsightOrderTitles;
