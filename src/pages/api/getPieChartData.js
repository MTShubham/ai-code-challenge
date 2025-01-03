import axios from 'axios';

export default async function handler(req, res) {
  const { category, userID } = req.query;

  try {
    // Replace with the actual API endpoint you want to call
    // const response = await axios.get(`https://api.example.com/data?category=${category}&userID=${userID}`);
    // const data = response.data;

    // // Process the data if necessary
    // const pieChartData = data.map(item => ({
    //   value: item.value,
    //   label: item.label,
    // }));

    res.status(200).json({value: [12, 19, 3, 5, 2, 3, 100], labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Blue'] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}