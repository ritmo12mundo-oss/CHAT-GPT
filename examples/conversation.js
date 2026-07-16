/**
 * Ejemplo: Conversación Multi-turno
 * Mantén una conversación con contexto histórico
 */

const fetch = require('node-fetch');

async function conversation() {
  try {
    console.log('\n🔄 Iniciando conversación...\n');

    const messages = [
      {
        role: 'user',
        content: 'Mi nombre es Juan. Tengo 30 años y soy programador.'
      }
    ];

    // Primer turno
    let response = await fetch('http://localhost:3000/api/chat/conversation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages })
    });

    let data = await response.json();
    console.log('👤 Usuario: Mi nombre es Juan. Tengo 30 años y soy programador.');
    console.log('🤖 ChatGPT:', data.response);

    messages.push({
      role: 'assistant',
      content: data.response
    });

    // Segundo turno
    const question2 = '¿Qué lenguajes de programación me recomiendas aprender?';
    messages.push({
      role: 'user',
      content: question2
    });

    response = await fetch('http://localhost:3000/api/chat/conversation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages })
    });

    data = await response.json();
    console.log('\n👤 Usuario:', question2);
    console.log('🤖 ChatGPT:', data.response);

    console.log('\n✅ Conversación completada');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

conversation();
