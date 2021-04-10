import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';

export default function DataPickerType({
  name, value, onChange, className,
}) {
  return (
    <DatePicker
      className={className}
      selected={(value && new Date(value)) || null}
      onChange={(val) => { onChange(name, val); }}
      showTimeSelect
      minTime={setHours(setMinutes(new Date(), 0), 8)}
      maxTime={setHours(setMinutes(new Date(), 30), 17)}
      dateFormat="dd/MM/yyyy H:mm"
      timeFormat="HH:mm"
      minDate={new Date()}
    />
  );
}
