const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
require('dotenv').config();
  
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

app.post('/api/openai', async (req, res) => {
  try {
    console.log(process.env.OPENAI_API_KEY); // Для отладки
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
