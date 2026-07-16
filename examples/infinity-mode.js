/**
 * Ejemplo: Modo Infinito
 * Genera múltiples preguntas y respuestas automáticamente
 */

const fetch = require('node-fetch');

async function infinityMode() {
  try {
    console.log('\n∞ Iniciando Modo Infinito...\n');

    const response = await fetch('http://localhost:3000/api/infinity/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        topic: 'ciencia',
        language: 'español',
        count: 3,
        temperature: 0.8
      })
    });

    const data = await response.json();

    if (data.success) {
      console.log(`📚 Tema: ${data.topic}`);
      console.log(`🌍 Idioma: ${data.language}`);
      console.log(`🔢 Iteraciones: ${data.total_iterations}\n`);
      console.log('─'.repeat(60));

      data.responses.forEach((item) => {
        console.log(`\n📄 Iteración ${item.iteration}:`);
        console.log(item.content);
        console.log(`Tokens: ${item.usage.total_tokens}`);
        console.log('─'.repeat(60));
      });

      console.log('\n✅ Modo Infinito completado');
    } else {
      console.error('Error:', data.error);
    }
  } catch (error) {
    console.error('Error de conexión:', error.message);
  }
}

infinityMode();
