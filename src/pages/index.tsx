import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import PieChartComponent from '../components/PieChartComponent';
import BarChartComponent from '../components/BarChartComponent';
import CardComponent from '../components/CardComponent';
import ExpensesTableComponent from '../components/ExpensesTableComponent';
import axios from 'axios';

export default function Home() {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/getPieChartData?category=exampleCategory&userID=1');
        const pieChartData = response.data;
        setData(pieChartData.value);
        setLabels(pieChartData.labels);

        // Example expenses data
        setExpenses([
          { date: '2023-10-01', description: 'Groceries', category: 'Food', amount: '$50' },
          { date: '2023-10-02', description: 'Electricity Bill', category: 'Utilities', amount: '$30' },
          { date: '2023-10-03', description: 'Internet Bill', category: 'Utilities', amount: '$20' },
          { date: '2023-10-04', description: 'Dinner', category: 'Food', amount: '$40' },
          { date: '2023-10-05', description: 'Transport', category: 'Travel', amount: '$15' },
          { date: '2023-10-01', description: 'Groceries', category: 'Food', amount: '$50' },
          { date: '2023-10-02', description: 'Electricity Bill', category: 'Utilities', amount: '$30' },
          { date: '2023-10-03', description: 'Internet Bill', category: 'Utilities', amount: '$20' },
          { date: '2023-10-04', description: 'Dinner', category: 'Food', amount: '$40' },
          { date: '2023-10-05', description: 'Transport', category: 'Travel', amount: '$15' },
        ]);
      } catch (error) {
        console.error('Error fetching pie chart data:', error);
      }
    };

    fetchData();
  }, []);

  

  return (
    <div className="mt-5">
      <Row>
        <Col xs="12" sm="12" md="6" lg="4" className="mb-4">
          <CardComponent title="Pie Chart 1">
            <PieChartComponent data={data} labels={labels} />
          </CardComponent>
        </Col>
        <Col xs="12" sm="12" md="6" lg="4" className="mb-4">
          <CardComponent title="Bar Chart">
            <BarChartComponent labels={labels} data={data} />
          </CardComponent>
        </Col>
        <Col xs="12" sm="12" md="12" lg="4" className="mb-4">
          <CardComponent title="Last 10 Expenses">
            <ExpensesTableComponent expenses={expenses} />
          </CardComponent>
        </Col>
      </Row>
    </div>
  );
}