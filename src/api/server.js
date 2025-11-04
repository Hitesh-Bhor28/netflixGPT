import express from "express";
import cors from "cors"; 
import { GoogleGenAI } from "@google/genai";
 

const app = express();
app.use(express.json());
app.use(cors());

// Initialize Gemini client (new syntax)
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Hello, this is the NetflixGPT web service powered by Gemini 2.0!");
});

app.post("/api/gemini", async (req, res) => {
  try {
    const { prompt } = req.body;

    // ✅ Use the new API format
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingBudget: 0, // optional — disables “thinking” mode
        },
      },
    });

    res.json({ text: response.text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to call Gemini" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
