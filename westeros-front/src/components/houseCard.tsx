import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, TextField, Button, Box } from '@mui/material';

interface HouseCardProps {
  imageUrl: string;
  houseName: string;
  description: string;
  button1Text?: string;  // Hacer opcionales los textos
  button2Text?: string;
  onValueChange?: (value: number) => void;
  onButton1Click?: () => void;
  onButton2Click?: () => void;
}

const HouseCard: React.FC<HouseCardProps> = ({
  imageUrl,
  houseName,
  description,
  button1Text = "Botonardo 1",  // Asignar valor predeterminado
  button2Text = "Botoneto 2",
  onValueChange,
  onButton1Click,
  onButton2Click
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setInputValue(event.target.value);
    if (!isNaN(value) && onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <Card sx={{ maxWidth: 345, padding: 2, overflow: 'hidden', textAlign: 'center', borderRadius: 3 }}>
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={houseName}
        sx={{borderRadius: 3}}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {houseName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Box mt={2}>
          <TextField
            label="Máximo de puja"
            type="number"
            variant="outlined"
            fullWidth
            value={inputValue}
            onChange={handleInputChange}
          />
        </Box>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={onButton1Click}>
            {button1Text}
          </Button>
          <Button variant="contained" color="secondary" onClick={onButton2Click}>
            {button2Text}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HouseCard;

