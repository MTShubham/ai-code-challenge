import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import randomColorGenerator from '../utils/randomColorGenerator';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({ data, labels }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: randomColorGenerator(data.length),
        
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default PieChartComponent;