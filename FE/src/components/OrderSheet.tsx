import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
const styles = {
  container: 'p-5 bg-white top-[20px] right-[20px]',
  title: 'text-2xl font-bold text-center mb-8 mt-4',
  label: 'font-semibold flex items-center  text-[18px]',
  input:
    'border-solid border-[1px] border-slate-300 rounded-md ml-4 h-10 w-full text-center text-[16px] font-normal',
  button:
    'mt-[10px] p-[10px] bg-red-500 text-white rounded-xl font-bold cursor-pointer',
};
const OrderSheet = () => {
  return (
    <Sheet>
      <SheetTrigger className="rounded-3xl max-w-[400px] bg-[#EB4F47] text-white font-bold text-[18px] py-2 px-8 justify-center flex">
        Order now
      </SheetTrigger>
      <SheetContent className="min-w-[400px]">
        <SheetHeader>
          <SheetTitle>Order</SheetTitle>
        </SheetHeader>
        <div className={styles.container}>
          <h2 className={styles.title}>Schedule Appointment</h2>
          <form className="flex flex-col gap-[30px]">
            <div>
              <label className={styles.label}>
                Name:
                <input
                  type="text"
                  required
                  className={styles.input}
                  placeholder="Type your name here"
                />
              </label>
            </div>
            <div>
              <label className={styles.label}>
                Phone number:
                <input
                  type="text"
                  required
                  className={styles.input}
                  placeholder="Type your phone number"
                />
              </label>
            </div>
            <div>
              <label className={styles.label}>
                Date:
                <input type="date" className={styles.input} required />
              </label>
            </div>
            <div>
              <label className={styles.label}>
                Time:
                <input type="time" className={styles.input} required />
              </label>
            </div>
            <button type="submit" className={styles.button}>
              Schedule
            </button>
          </form>

          <h3 className="mt-10 mb-10 font-bold">Scheduled Appointments</h3>
          <ul className="list-none">
            {/* {appointments.map((appointment, index) => (
              <li key={index} className="mr-2">
                {appointment.name} - {appointment.date} at {appointment.time}
              </li>
            ))} */}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default OrderSheet;
