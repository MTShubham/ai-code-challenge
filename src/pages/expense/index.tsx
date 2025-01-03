import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Table, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { GetServerSideProps } from 'next';
import styles from './expense.module.css';
import ListAllExpenses from '../../components/ListAllExpenses';
import axios from 'axios';

interface Expense {
  date: string;
  amount: number;
  category: string;
  description: string;
}

interface ExpensePageProps {
  expenses: Expense[];
  error?: string;
  categories: { id: number; name: string }[];
}

const ExpensePage: React.FC<ExpensePageProps> = ({ categories }) => {
  const [newExpense, setNewExpense] = useState<Expense>({
    date: '',
    amount: 0,
    category: '',
    description: '',
  });
  const [amountError, setAmountError] = useState<string | null>(null);

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expensesResponse = await axios.get('/api/getExpenses?userID=1&pageSize=500');
        const expensesData = expensesResponse.data;
        setExpenses(expensesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  
  }, []);

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

    if (newExpense?.amount <= 0) {
      setAmountError('Amount should be more than 0');
      return;
    }

    try {
      const response = await fetch('/api/addExcpenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExpense),
      });

      console.log({response})
      if (!response.ok) {
        throw new Error('Failed to add expense');
      }

      const result = await response.json();
      console.log('Expense added successfully:', result);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <div className={styles.container}>
      <Row>
        <Col xl="8" md="12">
          <ListAllExpenses error={null} expenses={expenses} />
        </Col>
        <Col md="1"></Col>
        <Col xl="2" md="12">
          <h3 className={styles.addExpenseListHeading}>Add Expense</h3>
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
                  type="select"
                  name="category"
                  id="category"
                  value={newExpense.category}
                  onChange={handleInputChange}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </Input>
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
              <Button type="submit" color="primary">Add Expense</Button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let categories = [];

  try {
    const response = await fetch('http://192.168.3.122:8081/v1/category');
    categories = await response.json();
  } catch (error) {
    error = error;
  }

  return {
    props: {
      expenses: [],
      categories,
      },
  };
};

export default ExpensePage;

