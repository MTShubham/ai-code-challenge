import React from 'react';
import { Table, Alert, Button } from 'reactstrap';
import styles from './ListAllExpenses.module.css';
import DateRangePicker from '../DateRangePicker/DateRangePicker';

const ListAllExpenses = ({ error, expenses, onChange, onEdit }) => {
  const onDateRangeChange = (dateRange) => {
    onChange(dateRange);
  };

  return (
    <>
      <h3 className={styles.heading}>Track your Expenses</h3>

      <DateRangePicker onDateRangeChange={onDateRangeChange} />

      {error ? (
        <Alert color="danger">{error}</Alert>
      ) : (
        <Table striped responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses?.map((expense, index) => (
              <tr key={index}>
                <td>{expense?.date}</td>
                <td>{expense?.category}</td>
                <td>{expense?.description}</td>
                <td>{expense?.amount}</td>
                <td>
                  <Button color="warning" onClick={() => onEdit(expense)}>Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ListAllExpenses;