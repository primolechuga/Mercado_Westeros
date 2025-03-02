import React, { useState, useEffect, useRef } from 'react';
import { IconButton, Box, Paper, Typography, Button, TextField } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';

interface Message {
  text: string;
  isBot: boolean;
}

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const websocket = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null); // Referencia para el scroll

  useEffect(() => {
    if (isOpen) {
      websocket.current = new WebSocket('ws://localhost:8000/ws/chat');

      websocket.current.onmessage = (event) => {
        setMessages(prev => [...prev, { text: event.data, isBot: true }]);
      };

      websocket.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      return () => {
        websocket.current?.close();
      };
    }
  }, [isOpen]);

  useEffect(() => {
    // Auto-scroll al último mensaje cuando la lista de mensajes cambia
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = () => {
    if (message.trim() && websocket.current) {
      websocket.current.send(message);
      setMessages(prev => [...prev, { text: message, isBot: false }]);
      setMessage('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <IconButton
        color="secondary"
        onClick={toggleChat}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          width: 64,
          height: 64,
          backgroundColor: 'secondary.main',
          color: '#fff',
          '&:hover': { backgroundColor: 'secondary.dark' },
        }}
      >
        <ChatIcon sx={{ fontSize: 32 }} />
      </IconButton>

      {isOpen && (
        <Paper
          elevation={3}
          sx={{
            position: 'fixed',
            bottom: 80,
            right: 16,
            width: 360, // Aumenté el tamaño de la ventana
            height: 500,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 4,
            borderRadius: 2,
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              backgroundColor: 'secondary.main',
              color: '#fff',
              padding: '8px',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              position: 'relative',
            }}
          >
            <Typography variant="h6">Ayuda de Maestre</Typography>
            <Typography variant="body2">¿En qué puedo ayudarte?</Typography>
            <IconButton
              sx={{ position: 'absolute', top: 8, right: 8, color: '#fff' }}
              onClick={toggleChat}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              padding: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  alignSelf: msg.isBot ? 'flex-end' : 'flex-start', // Mensajes del usuario a la izquierda
                  maxWidth: '80%',
                  padding: 1,
                  borderRadius: 2,
                  backgroundColor: msg.isBot ? 'grey.300' : 'secondary.light',
                  color: msg.isBot ? '#000' : '#fff',
                  wordBreak: 'break-word',
                }}
              >
                <Typography variant="body2">{msg.text}</Typography>
              </Box>
            ))}
            <div ref={messagesEndRef} /> {/* Elemento invisible para hacer scroll */}
          </Box>

          <Box
            sx={{
              display: 'flex',
              padding: 1,
              borderTop: '1px solid #ccc',
              gap: 1,
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Escribe un mensaje..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button
              variant="contained"
              onClick={sendMessage}
              disabled={!message.trim()}
            >
              Enviar
            </Button>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default FloatingChat;
