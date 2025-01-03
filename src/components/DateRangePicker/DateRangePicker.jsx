import React, { useState } from 'react';
import { Form, FormGroup, Label, Button } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DateRangePicker.module.css';

const DateRangePicker = ({ onDateRangeChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onDateRangeChange({ startDate, endDate });
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.container}>
      <FormGroup>
        <Label for="startDate">Start Date</Label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="yyyy/MM/dd"
          className="form-control"
          id="startDate"
        />
      </FormGroup>
      <FormGroup>
        <Label for="endDate">End Date</Label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="yyyy/MM/dd"
          className="form-control"
          id="endDate"
        />
      </FormGroup>
      <Button type="submit" color="primary">Apply</Button>
    </Form>
  );
};

export default DateRangePicker;
