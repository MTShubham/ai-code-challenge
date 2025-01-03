import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import PieChartComponent from '../components/PieChartComponent';
import CardComponent from '../components/CardComponent';
import BarChartComponent from '../components/BarChartComponent';
import axios from 'axios';

export default function Home() {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/getPieChartData?category=exampleCategory&userID=1');
        const pieChartData = response.data;
        debugger;
        setData(pieChartData.value);
        setLabels(pieChartData.labels);
      } catch (error) {
        console.error('Error fetching pie chart data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <Col xs="12" sm="12" md="6" lg="4" className="mb-4">
          <CardComponent title="Pie Chart 1">
            <PieChartComponent data={data} labels={labels} />
          </CardComponent>
        </Col>
        <Col xs="12" sm="12" md="6" lg="4" className="mb-4">
          <CardComponent title="Pie Chart 2">
            <BarChartComponent data={data} labels={labels} />
          </CardComponent>
        </Col>
        <Col xs="12" sm="12" md="6" lg="4" className="mb-4">
          <CardComponent title="Pie Chart 3">
            <PieChartComponent data={data} labels={labels} />
          </CardComponent>
        </Col>
      </Row>
    </Container>
  );
}