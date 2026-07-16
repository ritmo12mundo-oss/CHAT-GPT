# 🤖 CHAT-GPT API

API propia para usar ChatGPT con Node.js y Express.

## ⚡ Características

- ✅ Chat simple con ChatGPT
- ✅ Conversaciones multi-turno con historial
- ✅ Respuestas en tiempo real (Streaming)
- ✅ Modo Infinito (múltiples preguntas y respuestas)
- ✅ Completación de textos
- ✅ Control de temperatura y modelo

## 🚀 Instalación Rápida

### Requisitos
- Node.js v14+
- npm o yarn
- Clave API de OpenAI: https://platform.openai.com/api-keys

### Pasos

1. **Clona el repositorio**
```bash
git clone https://github.com/ritmo12mundo-oss/CHAT-GPT.git
cd CHAT-GPT
```

2. **Instala dependencias**
```bash
npm install
```

3. **Configura variables de entorno**
```bash
cp .env.example .env
```

Edita `.env` y añade tu clave API de OpenAI:
```
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxx
PORT=3000
NODE_ENV=development
```

4. **Inicia el servidor**
```bash
npm run dev
```

El servidor estará en `http://localhost:3000`

## 📚 Endpoints Disponibles

### 1. Chat Simple
```bash
POST /api/chat
Content-Type: application/json

{
  "message": "¿Cuál es la capital de Francia?",
  "model": "gpt-3.5-turbo",
  "temperature": 0.7
}
```

### 2. Conversación con Historial
```bash
POST /api/chat/conversation

{
  "messages": [
    {"role": "user", "content": "Hola"},
    {"role": "assistant", "content": "¡Hola!"},
    {"role": "user", "content": "¿Cómo estás?"}
  ]
}
```

### 3. Streaming (Tiempo Real)
```bash
POST /api/chat/stream

{
  "message": "Escribe un poema sobre programación"
}
```

### 4. Completación de Texto
```bash
POST /api/complete

{
  "prompt": "Python es un lenguaje de programación"
}
```

### 5. Modo Infinito
```bash
POST /api/infinity/generate

{
  "topic": "ciencia",
  "language": "español",
  "count": 3
}
```

### 6. Health Check
```bash
GET /health
```

## 🧪 Ejemplos de Uso

### cURL
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hola, ¿cómo estás?"}'
```

### JavaScript/Fetch
```javascript
const response = await fetch('http://localhost:3000/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: '¿Hola, cómo estás?' })
});

const data = await response.json();
console.log(data.response);
```

### Python
```python
import requests

response = requests.post('http://localhost:3000/api/chat', json={
    'message': '¿Hola, cómo estás?'
})

print(response.json()['response'])
```

## 📁 Estructura del Proyecto

```
CHAT-GPT/
├── server.js              # Servidor principal
├── package.json           # Dependencias
├── .env.example          # Template de variables
├── README.md             # Este archivo
├── examples/
│   ├── index.html        # Cliente web
│   ├── chat-simple.js    # Ejemplo Node.js simple
│   ├── conversation.js   # Conversación multi-turno
│   ├── infinity-mode.js  # Modo infinito
│   └── chatbot.py        # Chatbot Python interactivo
└── .gitignore
```

## 🎯 Casos de Uso

### 1. Chatbot Web
Abre `examples/index.html` en tu navegador para usar la interfaz web.

### 2. Script Node.js
```bash
node examples/chat-simple.js
```

### 3. Chatbot Python Interactivo
```bash
pip install requests
python examples/chatbot.py
```

### 4. Modo Infinito
```bash
node examples/infinity-mode.js
```

## 📊 Parámetros

- **message**: Mensaje a enviar (string, requerido)
- **model**: Modelo OpenAI (default: gpt-3.5-turbo)
  - `gpt-3.5-turbo` - Rápido y económico
  - `gpt-4` - Más poderoso
  - `gpt-4-turbo` - Balance
- **temperature**: Creatividad 0-2 (default: 0.7)
  - 0 = determinista
  - 1 = neutral
  - 2 = muy creativo

## 🔐 Seguridad

⚠️ **IMPORTANTE:**
- Nunca compartas tu `.env` o clave API
- No hagas commit de `.env` (está en `.gitignore`)
- Usa variables de entorno en producción
- Implementa rate limiting en producción
- Valida inputs antes de enviar a OpenAI

## 💰 Gestión de Costos

Cada llamada consume tokens de tu clave API de OpenAI:
- Monitorea en: https://platform.openai.com/usage/
- Implementa límites de rate
- Considera cachear respuestas frecuentes
- Ten cuidado con mode infinito (consume muchos tokens)

## 🐛 Troubleshooting

### Error: "OPENAI_API_KEY is not set"
- Crea el archivo `.env`
- Copia tu clave API desde https://platform.openai.com/api-keys

### Error: "Cannot POST /api/chat"
- Verifica que el servidor está corriendo: `npm run dev`
- Verifica la URL: `http://localhost:3000`

### Error: "401 Unauthorized"
- Tu clave API es inválida
- Obtén una nueva en https://platform.openai.com/api-keys

### Error: "Rate limit exceeded"
- Espera unos minutos antes de reintentar
- En producción, implementa retry logic

## 📄 Licencia

MIT

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/mi-feature`)
3. Commit tus cambios (`git commit -m 'Add mi-feature'`)
4. Push a la rama (`git push origin feature/mi-feature`)
5. Abre un Pull Request

## 📞 Soporte

Si tienes problemas:
1. Revisa la documentación de OpenAI: https://platform.openai.com/docs
2. Crea un issue en GitHub
3. Consulta los ejemplos en la carpeta `examples/`

---

**Hecho con ❤️ para la comunidad de desarrolladores**
