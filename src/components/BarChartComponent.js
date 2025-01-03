import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import moment from 'moment';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const groupByDateForLast7Days = (expenses) => {
    const last7Days = Array.from({ length: 7 }, (_, i) => moment().subtract(i, 'days').format('YYYY-MM-DD')).reverse();
    const expensesByDate = last7Days.map(date => {
      const totalAmount = expenses
        .filter(expense => moment(expense.date, 'M/D/YYYY').format('YYYY-MM-DD') === date)
        .reduce((sum, expense) => sum + expense.amount, 0);
      return totalAmount;
    });
  
    return { last7Days, expensesByDate };
  };

const BarChartComponent = ({ data }) => {
    const { last7Days, expensesByDate } = groupByDateForLast7Days(data);


  const chartData = {
    labels: last7Days,
    datasets: [
      {
        label: 'Expenses',
        data: expensesByDate,
        backgroundColor: 'rgba(51, 63, 63, 0.6)',
        borderColor: 'rgb(11, 12, 12)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} width={500} height={500} />;
};

export default BarChartComponent;