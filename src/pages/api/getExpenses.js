import axios from 'axios';

export default async function handler(req, res) {
  const { userID, pageSize = 500 } = req.query;

  try {
    // Replace with the actual API endpoint you want to call
    const response = await axios.get(`http://192.168.3.122:8081/v1/expenses?UserId=${userID}&PageSize=${pageSize}&SortBy=Date&SortOrder=desc`);
    const data = response.data;
    console.log('data', data);

    // Process the data if necessary
    const expenses = data?.expenses?.map(item => ({
        name: item.Name,
        description: item.Description,
        category: item.Category,
        amount: item.Amount,
        date: new Date(item.Date).toLocaleDateString(),
    }));

    console.log('expenses', expenses);

    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
}