import React from 'react';
import { Table } from 'reactstrap';

const ExpensesTableComponent = ({ expenses }) => {
  return (
    <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Description</th>
          <th>Category</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{expense.date}</td>
            <td>{expense.description}</td>
            <td>{expense.category}</td>
            <td>{expense.amount}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ExpensesTableComponent;