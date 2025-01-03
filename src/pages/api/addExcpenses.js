
export default async function handler(req, res) {
const response = await fetch('http://192.168.3.122:8081/v1/expenses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: req.body,
  });
  res.status(200).json(expenses);
}