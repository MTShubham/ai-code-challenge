import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import randomColorGenerator from '../utils/randomColorGenerator';

ChartJS.register(ArcElement, Tooltip, Legend);

const groupByCategory = (expenses) => {
  return expenses.reduce((acc, expense) => {
    const { category, amount } = expense;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += amount;
    return acc;
  }, {});
};

const PieChartComponent = ({data}) => {
  const groupedData = groupByCategory(data);
  const labels = Object.keys(groupedData);
  const amounts = Object.values(groupedData);
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: amounts,
        backgroundColor: randomColorGenerator(data.length),
        
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default PieChartComponent;