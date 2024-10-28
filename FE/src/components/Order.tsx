import React, { useState } from 'react';

const styles = {
    container:
      'w-[350px] p-5 border-[1px] bg-white rounded-xl border-solid border-slate-200 drop-shadow-xl fixed top-[20px] right-[20px]',
    title:
      'text-2xl font-bold text-center mb-8 mt-4',
    label: 'font-semibold flex items-center  text-[18px]',
    input:
      'border-solid border-[1px] border-slate-300 rounded-md ml-4 h-10 w-full text-center text-[16px] font-normal',
    button: 'mt-[10px] p-[10px] bg-red-500 text-white rounded-xl font-bold cursor-pointer',
   
  };

interface Appointment {
  name: string;
  phone: string;
  date: string;
  time: string;
}

const AppointmentSidebar= () => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone && date && time) {
      const newAppointment: Appointment = { name, phone, date, time };
      setAppointments([...appointments, newAppointment]);
      setName('');
      setPhone('');
      setDate('');
      setTime('');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Schedule Appointment</h2>
      <form className='flex flex-col gap-[30px]' onSubmit={handleSubmit}>
        <div>
          <label className={styles.label}>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={styles.input}
              placeholder='Type your name here'
            />
          </label>
        </div>
        <div>
          <label className={styles.label}>
            Phone number:
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className={styles.input}
              placeholder='Type your phone number'
            />
          </label>
        </div>
        <div>
          <label className={styles.label}>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={styles.input}
              required
            />
          </label>
        </div>
        <div>
          <label className={styles.label}>
            Time:
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={styles.input}
              required
            />
          </label>
        </div>
        <button type="submit" className={styles.button}>Schedule</button>
      </form>

      <h3 className='mt-10 mb-10 font-bold'>Scheduled Appointments</h3>
      <ul className='list-none'>
        {appointments.map((appointment, index) => (
          <li key={index} className='mr-2'>
            {appointment.name} - {appointment.date} at {appointment.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentSidebar;
