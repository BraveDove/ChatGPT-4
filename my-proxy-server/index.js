const express = require('express');
const app = express();
const fetch = require('node-fetch');
require('dotenv').config();

app.use(express.json());

app.post('/api/openai', async (req, res) => {
    try {
        const openaiResponse = await fetch(process.env.OPENAI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                prompt: req.body.userInput,
                max_tokens: 150
            })
        });
        if (!openaiResponse.ok) throw new Error('Failed to fetch OpenAI');
        const openaiData = await openaiResponse.json();
        res.json({ answer: openaiData.choices[0].text });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
