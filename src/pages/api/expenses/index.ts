import { NextApiRequest, NextApiResponse } from 'next';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    
    res.status(200).json([]);
  } else if (req.method === 'POST') {
    console.log({ reqBody: req.body });
    
    const response = await fetch('http://192.168.3.122:8081/v1/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: req.body  }),
    });
    console.log(response)
    if (response.ok) {
      const data = await response.json();
    res.status(201).json(data);
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}