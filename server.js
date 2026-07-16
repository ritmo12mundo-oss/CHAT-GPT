const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Routes

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'API is running', timestamp: new Date() });
});

// Chat endpoint - Simple message
app.post('/api/chat', async (req, res) => {
  try {
    const { message, model = 'gpt-3.5-turbo', temperature = 0.7 } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: 'user',
          content: message
        }
      ],
      temperature: temperature,
      max_tokens: 2000
    });

    res.json({
      success: true,
      message: message,
      response: response.choices[0].message.content,
      model: model,
      usage: response.usage
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Chat endpoint - Conversation with history
app.post('/api/chat/conversation', async (req, res) => {
  try {
    const { messages, model = 'gpt-3.5-turbo', temperature = 0.7 } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const response = await openai.chat.completions.create({
      model: model,
      messages: messages,
      temperature: temperature,
      max_tokens: 2000
    });

    res.json({
      success: true,
      response: response.choices[0].message.content,
      model: model,
      usage: response.usage
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Streaming endpoint - Real-time response
app.post('/api/chat/stream', async (req, res) => {
  try {
    const { message, model = 'gpt-3.5-turbo', temperature = 0.7 } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const stream = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: 'user',
          content: message
        }
      ],
      temperature: temperature,
      max_tokens: 2000,
      stream: true
    });

    for await (const chunk of stream) {
      const delta = chunk.choices[0].delta;
      if (delta.content) {
        res.write(`data: ${JSON.stringify({ content: delta.content })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Completion endpoint - Text completion
app.post('/api/complete', async (req, res) => {
  try {
    const { prompt, model = 'gpt-3.5-turbo', temperature = 0.7 } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const response = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: temperature,
      max_tokens: 2000
    });

    res.json({
      success: true,
      prompt: prompt,
      completion: response.choices[0].message.content,
      model: model,
      usage: response.usage
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Infinity mode endpoint - Continuous responses
app.post('/api/infinity/generate', async (req, res) => {
  try {
    const { 
      topic = 'random', 
      language = 'English',
      count = 5,
      model = 'gpt-3.5-turbo',
      temperature = 0.7 
    } = req.body;

    const responses = [];

    for (let i = 0; i < count; i++) {
      const prompt = `Generate a single random question on ${topic === 'random' ? 'ANY topic' : `the topic of ${topic}`} in ${language}, then answer it. Don't type anything else.`;

      const response = await openai.chat.completions.create({
        model: model,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: temperature,
        max_tokens: 1000
      });

      responses.push({
        iteration: i + 1,
        content: response.choices[0].message.content,
        usage: response.usage
      });

      // Add delay between requests to avoid rate limiting
      if (i < count - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    res.json({
      success: true,
      topic: topic,
      language: language,
      total_iterations: count,
      responses: responses
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n✅ API Server running at http://localhost:${PORT}`);
  console.log(`🧪 Test: curl http://localhost:${PORT}/health\n`);
});
