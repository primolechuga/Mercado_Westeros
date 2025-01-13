import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';
import { Send } from 'lucide-react';

// Definimos los tipos
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [wsConnection, setWsConnection] = useState<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Función para conectar al WebSocket
  useEffect(() => {
    const ws = new WebSocket('ws://tu-servidor-websocket.com');

    ws.onopen = () => {
      console.log('Conectado al servidor WebSocket');
    };

    ws.onmessage = (event) => {
      const botResponse = JSON.parse(event.data);
      addMessage({
        id: Date.now().toString(),
        text: botResponse.message,
        sender: 'bot',
        timestamp: new Date(),
      });
    };

    ws.onerror = (error) => {
      console.error('Error en WebSocket:', error);
    };

    setWsConnection(ws);

    return () => {
      ws.close();
    };
  }, []);

  // Función para agregar mensajes
  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  // Auto scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Manejar envío de mensaje
  const handleSendMessage = () => {
    if (newMessage.trim() && wsConnection) {
      // Enviar mensaje al servidor
      wsConnection.send(JSON.stringify({ message: newMessage }));

      // Agregar mensaje del usuario al chat
      addMessage({
        id: Date.now().toString(),
        text: newMessage,
        sender: 'user',
        timestamp: new Date(),
      });

      setNewMessage('');
    }
  };

  // Manejar tecla Enter
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Paper className="w-full max-w-2xl mx-auto h-[600px] flex flex-col">
      {/* Header */}
      <Box className="p-4 bg-blue-600 text-white">
        <Typography variant="h6">Chat Bot</Typography>
      </Box>

      {/* Messages Area */}
      <List className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <ListItem
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            } mb-4`}
          >
            <Box
              className={`flex items-start max-w-[70%] ${
                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <ListItemAvatar>
                <Avatar>
                  {message.sender === 'user' ? 'U' : 'B'}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={message.text}
                secondary={message.timestamp.toLocaleTimeString()}
                className={`mx-2 p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200'
                }`}
              />
            </Box>
          </ListItem>
        ))}
        <div ref={messagesEndRef} />
      </List>

      {/* Input Area */}
      <Box className="p-4 border-t">
        <div className="flex gap-2">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Escribe un mensaje..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            size="small"
          />
          <IconButton
            onClick={handleSendMessage}
            color="primary"
            disabled={!newMessage.trim()}
          >
            <Send />
          </IconButton>
        </div>
      </Box>
    </Paper>
  );
};

export default ChatComponent;