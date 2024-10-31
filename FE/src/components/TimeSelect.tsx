import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
const time = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
];
export function TimeSelect() {
  return (
    <Select>
      <SelectTrigger className="w-full h-12 ">
        <SelectValue placeholder="Select a Time" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {time.map((time) => (
            <SelectItem value={time}>{time}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
