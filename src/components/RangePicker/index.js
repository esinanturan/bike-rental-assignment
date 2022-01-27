import React from "react";
import DatePicker from "react-datepicker";
import container from "./container";

const DatePickerField = ({ value, startDate, endDate, onChange, ...props }) => {
  return (
    <DatePicker
      selected={(value && new Date(value)) || null}
      startDate={startDate}
      endDate={endDate}
      onChange={onChange}
      {...props}
    />
  );
};

export default container(DatePickerField);
