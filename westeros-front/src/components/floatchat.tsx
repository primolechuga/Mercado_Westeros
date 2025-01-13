import React, { useState } from 'react';
import { IconButton, Box, Paper, Typography, Button, TextField } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages((prevMessages) => [...prevMessages, message]);
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
      {/* Botón flotante */}
      <IconButton
        color="primary"
        onClick={toggleChat}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          backgroundColor: 'primary.main',
          color: '#fff',
          '&:hover': { backgroundColor: 'primary.dark' },
        }}
      >
        <ChatIcon />
      </IconButton>

      {/* Ventana de chat */}
      {isOpen && (
        <Paper
          elevation={3}
          sx={{
            position: 'fixed',
            bottom: 80,
            right: 16,
            width: 300,
            height: 400,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 4,
            borderRadius: 2,
          }}
        >
          {/* Título */}
          <Box
            sx={{
              backgroundColor: 'primary.main',
              color: '#fff',
              padding: '8px',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
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

          {/* Mensajes */}
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              padding: 2,
              wordWrap: 'break-word', 
            }}
          >
            {messages.map((msg, index) => (
              <Typography
                key={index}
                sx={{
                  marginBottom: 1,
                  padding: 1,
                  backgroundColor: 'grey.100',
                  borderRadius: 1,
                  maxWidth: '80%',
                  alignSelf: index % 2 === 0 ? 'flex-start' : 'flex-end',
                  wordBreak: 'break-word',
                }}
              >
                {msg}
              </Typography>
            ))}
          </Box>

          {/* Entrada de mensaje */}
          <Box
            sx={{
              display: 'flex',
              padding: 1,
              borderTop: '1px solid #ccc',
            }}
          >
            <TextField
              variant="outlined"
              size="small"
              placeholder="Escribe un mensaje..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyUp={handleKeyPress}
              sx={{ flex: 1, marginRight: 1 }}
            />
            <Button variant="contained" onClick={sendMessage}>
              Enviar
            </Button>
          </Box>
        </Paper>
      )}
    </>
  );
};


export default FloatingChat;