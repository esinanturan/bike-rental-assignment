import { hoc } from "@";
import { useState } from "react";

const container = hoc((props) => {
  const [start, end] = props.defaultValue || [];
  const [startDate, setStartDate] = useState(
    (start && new Date(start)) || null
  );
  const [endDate, setEndDate] = useState((end && new Date(end)) || null);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    props.setFieldValue(props.name, dates);
  };

  return {
    ...props,
    startDate,
    endDate,
    onChange,
  };
});

export default container;
