import express from 'express';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/deposit', (req, res) => {
  const { phone, amount } = req.body;
  console.log('Deposit Request:', {
    phone,
    amount,
    timestamp: new Date().toISOString()
  });
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});