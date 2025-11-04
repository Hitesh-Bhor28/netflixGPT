// server.js
import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

// 1. Get the secure key from Render's Environment Variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const app = express();
app.use(express.json());
app.use(cors()); // Allow your React app to call this

// --- NEW CODE HERE ---
// This handles requests to the root URL
app.get('/', (req, res) => {
  res.send('Hello this is web service for netflixGPT created by Hitesh');
});
// --- END OF NEW CODE ---


// 2. Your existing API endpoint 
// This handles requests
app.post('/api/gemini', async (req, res) => {
  try {
    const { prompt } = req.body;
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = result.response;
    res.json({ text: response.text() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to call Gemini' });
  }
});

// 3. Tell the server to start
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});