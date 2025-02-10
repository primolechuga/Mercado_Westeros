import React, { useState } from "react";
import { Box, Button, TextField, Typography, Container, Card, CardContent } from "@mui/material";

const CreateAuctionPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ title, description, startingBid, endDate });
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Crear una Subasta
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField 
              fullWidth 
              label="Título" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              margin="normal" 
            />
            <TextField 
              fullWidth 
              label="Descripción" 
              multiline 
              rows={4} 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              margin="normal" 
            />
            <TextField 
              fullWidth 
              label="Oferta Inicial" 
              type="number" 
              value={startingBid} 
              onChange={(e) => setStartingBid(e.target.value)} 
              margin="normal" 
            />
            <TextField 
              fullWidth 
              label="Fecha de Finalización" 
              type="datetime-local" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
              margin="normal" 
            />
            <Box mt={2}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Crear Subasta
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CreateAuctionPage;