/**
 * Ejemplo: Chat Simple
 * Envía un mensaje y obtén una respuesta de ChatGPT
 */

const fetch = require('node-fetch');

async function simpleChat() {
  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: '¿Cuál es la capital de Francia?',
        model: 'gpt-3.5-turbo',
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (data.success) {
      console.log('\n📤 Pregunta:', data.message);
      console.log('📥 Respuesta:', data.response);
      console.log('🔢 Tokens usados:', data.usage.total_tokens);
    } else {
      console.error('Error:', data.error);
    }
  } catch (error) {
    console.error('Error de conexión:', error.message);
  }
}

simpleChat();
