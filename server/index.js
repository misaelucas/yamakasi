// server/index.js
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { OpenAI } from 'openai'

dotenv.config()
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body

  try {
    const chat = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that generates concise flashcards in JSON format.',
        },
        {
          role: 'user',
          content: `Generate 3 flashcards about: ${prompt}. Respond ONLY with a JSON array of objects with "question" and "answer".`,
        },
      ],
      temperature: 0.7,
    })

    const content = chat.choices[0].message.content
    const jsonMatch = content.match(/\[.*\]/s)
    const cards = jsonMatch ? JSON.parse(jsonMatch[0]) : []

    res.json({ cards })
  } catch (error) {
    console.error('OpenAI API error:', error)
    res.status(500).json({ error: 'Failed to generate flashcards' })
  }
})

app.listen(port, () => {
  console.log(`✅ API server running on http://localhost:${port}`)
})