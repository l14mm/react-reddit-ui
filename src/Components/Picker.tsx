import React from "react";

interface PickerProps {
  options: string[];
  value: string;
  onChange: Function;
}

const Picker = ({ value, onChange, options }: PickerProps) => (
  <span>
    <h1>{value}</h1>
    <select onChange={e => onChange(e.target.value)} value={value}>
      {options.map(option => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  </span>
);

export default Picker;
