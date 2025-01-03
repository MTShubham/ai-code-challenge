import React, { useState } from 'react';
import { Row, Col, Container, Table, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { GetServerSideProps } from 'next';
import styles from './expense.module.css';
import ListAllExpenses from '../../components/ListAllExpenses';

interface Expense {
  date: string;
  amount: number;
  category: string;
  description: string;
}

interface ExpensePageProps {
  expenses: Expense[];
  error?: string;
}

const ExpensePage: React.FC<ExpensePageProps> = ({ expenses, error }) => {
  const [newExpense, setNewExpense] = useState<Expense>({
    date: '',
    amount: 0,
    category: '',
    description: '',
  });
  const [amountError, setAmountError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });

    if (name === 'amount') {
      const amount = parseFloat(value);
      if (amount <= 0) {
        setAmountError('Amount should be more than 0');
      } else {
        setAmountError(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New Expense:', newExpense);
  
    try {
      const response = await fetch('https://api.example.com/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExpense),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add expense');
      }
  
      const result = await response.json();
      console.log('Expense added successfully:', result);
      // Optionally, you can update the state to reflect the new expense
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const isFormValid = () => {
    return (
      newExpense.date !== '' &&
      newExpense.amount > 0 &&
      newExpense.category !== '' &&
      newExpense.description !== ''
    );
  };

  const onChange = () => {
    
  }

  const onEdit = () => {
    
  }

  return (
    <div className={styles.container}>
      <Row>
        <Col md="8">
          <ListAllExpenses expenses={expenses} error={error} onChange={onChange} onEdit={onEdit} />
        </Col>
        <Col md="1"></Col>
        <Col md="2">
          <h3 className={styles.listHeading}>Add Expense</h3>
          <div>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="date">Date</Label>
                <Input
                  type="date"
                  name="date"
                  id="date"
                  value={newExpense.date}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="category">Category</Label>
                <Input
                  type="text"
                  name="category"
                  id="category"
                  value={newExpense.category}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  type="text"
                  name="description"
                  id="description"
                  value={newExpense.description}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="amount">Amount</Label>
                <Input
                  type="number"
                  name="amount"
                  id="amount"
                  value={newExpense.amount}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <Button type="submit" color="primary" disabled={!isFormValid}>Add Expense</Button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch('https://api.example.com/expenses?limit=5');
    if (!res.ok) {
      throw new Error('Failed to fetch expenses');
    }
    const expenses: Expense[] = await res.json();
    return {
      props: {
        expenses,
      },
    };
  } catch (error) {
    return {
      props: {
        expenses: [
            { date: '2025-01-01', amount: 50, category: 'Groceries', description: 'Bought vegetables and fruits' },
            { date: '2025-01-02', amount: 20, category: 'Transport', description: 'Bus fare' },
            { date: '2025-01-03', amount: 100, category: 'Entertainment', description: 'Movie tickets' },
            { date: '2025-01-04', amount: 200, category: 'Shopping', description: 'Clothes shopping' },
            { date: '2025-01-05', amount: 150, category: 'Utilities', description: 'Electricity bill' }
          ],
        // expenses: [],
        // error: error.message,
      },
    };
  }
};

export default ExpensePage;
