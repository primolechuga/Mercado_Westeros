from fastapi import FastAPI, WebSocket, HTTPException
# from transformers import pipeline, AutoTokenizer, AutoModelForCausalLM
from model import AsistenteProductos
import random
app = FastAPI()

# # Cargar el modelo y el tokenizador
# model_name = "microsoft/DialoGPT-small"  # Modelo generativo en español
# tokenizer = AutoTokenizer.from_pretrained(model_name)
# model = AutoModelForCausalLM.from_pretrained(model_name)

# # Crear una pipeline para generación de texto
# chatbot = pipeline("text-generation", model=model, tokenizer=tokenizer)
asistente = AsistenteProductos()

# Endpoint HTTP tradicional (POST)
@app.post("/chat/")
async def chat(prompt: str):
    try:
        # Generar una respuesta
        response = asistente.procesar_consulta(prompt)
        return {"response": response[0]['generated_text']}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint WebSocket para chat en tiempo real
async def handle_websocket_interaction(websocket: WebSocket):
    asistente = AsistenteProductos()
    await websocket.accept()
    
    # Enviar saludo inicial
    saludo = f"{random.choice(asistente.expresiones['saludos'])}\nSoy el Maestre de Biblioteca, ¿en qué le puedo ayudar?"
    await websocket.send_text(saludo)

    while True:
        try:
            user_input = await websocket.receive_text()
            
            # Verificar si es un comando de salida
            if user_input.lower() in ['salir', 'chao', 'adios', 'hasta luego', 'nos vemos']:
                despedida = random.choice(asistente.expresiones['despedidas'])
                await websocket.send_text(despedida)
                await websocket.close()
                break

            # Procesar consulta
            respuesta = asistente.procesar_consulta(user_input)
            await websocket.send_text(respuesta)

        except Exception as e:
            print(f"Error: {e}")
            await websocket.close()
            break

# Endpoint WebSocket modificado
@app.websocket("/ws/chat")
async def websocket_chat(websocket: WebSocket):
    await handle_websocket_interaction(websocket)

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}


# @app.websocket("/ws/chat")
# async def websocket_chat(websocket: WebSocket):
#     await websocket.accept()  # Aceptar la conexión WebSocket

#     # Historial de la conversación (opcional, para mantener contexto)
#     chat_history = []

#     while True:
#         try:
#             # Recibir el mensaje del cliente
#             prompt = await websocket.receive_text()

#             # Agregar el mensaje del usuario al historial (opcional)
#             chat_history.append(f"Usuario: {prompt}")

#             # Generar una respuesta usando el chatbot
#             response = chatbot(prompt, max_length=50, num_return_sequences=1, truncation=True)
#             generated_text = response[0]['generated_text']

#             # Agregar la respuesta del bot al historial (opcional)
#             chat_history.append(f"Bot: {generated_text}")

#             # Enviar la respuesta al cliente
#             await websocket.send_text(generated_text)
#         except Exception as e:
#             print(f"Error: {e}")
#             await websocket.close()  # Cerrar la conexión en caso de error
#             break
