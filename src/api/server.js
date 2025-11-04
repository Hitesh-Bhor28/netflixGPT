import express from 'express';
import cors from 'cors';
// Correct import for the new package
import { GoogleGenerativeAI } from '@google/genai'; 

// 1. Get the secure key from Render's Environment Variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const app = express();
app.use(express.json());
app.use(cors());

// Root URL handler
app.get('/', (req, res) => {
  res.send('Hello this is web service for netflixGPT created by Hitesh');
});


app.post('/api/gemini', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    // --- UPDATED SYNTAX ---
    // The new syntax is slightly different
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = result.response;
    // --- END OF UPDATE ---

    res.json({ text: response.text() });
  } catch (error) {
    console.error(error); // Log the error on the server
    res.status(500).json({ error: 'Failed to call Gemini' });
  }
});

// 3. Tell the server to start
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});