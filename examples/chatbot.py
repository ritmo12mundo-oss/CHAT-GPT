#!/usr/bin/env python3
"""
Ejemplo: Chatbot interactivo en Python
Comunicación bidireccional con la API
"""

import requests
import json
import sys

API_URL = 'http://localhost:3000/api/chat'

def pregunta_chatgpt(mensaje, temperatura=0.7):
    """
    Envía una pregunta a ChatGPT a través de la API
    """
    try:
        response = requests.post(API_URL, json={
            'message': mensaje,
            'temperature': temperatura
        })
        
        data = response.json()
        
        if data['success']:
            return data['response']
        else:
            return f"Error: {data['error']}"
            
    except Exception as e:
        return f"Error de conexión: {str(e)}"

def main():
    print("\n" + "="*60)
    print("💬 Chatbot con ChatGPT")
    print("Escribe 'salir' para terminar")
    print("="*60 + "\n")
    
    while True:
        try:
            pregunta = input("❓ Tu pregunta: ").strip()
            
            if pregunta.lower() in ['salir', 'exit', 'quit']:
                print("\n👋 ¡Hasta luego!")
                break
            
            if not pregunta:
                print("⚠️  Por favor, escribe una pregunta.\n")
                continue
            
            print("\n⏳ Esperando respuesta...")
            respuesta = pregunta_chatgpt(pregunta)
            print(f"\n🤖 ChatGPT: {respuesta}\n")
            print("-"*60 + "\n")
            
        except KeyboardInterrupt:
            print("\n\n👋 ¡Hasta luego!")
            break
        except Exception as e:
            print(f"\n❌ Error: {str(e)}\n")

if __name__ == '__main__':
    main()
