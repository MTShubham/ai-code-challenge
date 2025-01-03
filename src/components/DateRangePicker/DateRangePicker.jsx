import React, { useState } from 'react';
import { Form, FormGroup, Label, Button, Input } from 'reactstrap';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DateRangePicker.module.css';

const DateRangePicker = ({ onDateRangeChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(startDate && endDate && startDate < endDate) {
      onDateRangeChange({ startDate, endDate });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.container}>
      <FormGroup>
        <Label for="startDate">Start Date</Label>
        <Input
          name="startDate"
          id="startDate"
          type="date"
          onChange={(event) => setStartDate(event.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="endDate">End Date</Label>
        <Input
          name="endDate"
          id="endDate"
          type="date"
          onChange={(event) => setEndDate(event.target.value)}
        />
      </FormGroup>
      <Button type="submit" color="primary">Apply</Button>
    </Form>
  );
};

export default DateRangePicker;
