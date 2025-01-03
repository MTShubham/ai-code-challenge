import React, { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'reactstrap';
import PieChartComponent from '../components/PieChartComponent';
import BarChartComponent from '../components/BarChartComponent';
import CardComponent from '../components/CardComponent';
import ExpensesTableComponent from '../components/ExpensesTableComponent';
import axios from 'axios';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    // if (!session) router.push('/sign-in'); // Redirect to sign-in if not authenticated
  }, [session, status, router]);

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
    if (session) {
    }
  }, [session]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-5">
      {expenses && <Row>
        <Col xs="12" sm="12" md="6" lg="4" className="mb-4">
          <CardComponent title="Category wise expenses summary">
            <PieChartComponent data={expenses} />
          </CardComponent>
        </Col>
        <Col xs="12" sm="12" md="6" lg="4" className="mb-4">
          <CardComponent title="Last 7 days expenses">
            <BarChartComponent data={expenses} />
          </CardComponent>
        </Col>
        <Col xs="12" sm="12" md="6" lg="4" className="mb-4">
          <CardComponent title="Last 10 Expenses">
            <ExpensesTableComponent expenses={expenses} />
          </CardComponent>
        </Col>
      </Row>}
    </div>
  );
}