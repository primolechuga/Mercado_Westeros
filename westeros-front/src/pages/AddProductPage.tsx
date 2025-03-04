import React from "react";
import { Container } from "@mui/material";
import CreateProductForm from "../components/addProductForm";

export const AddProductPage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <CreateProductForm />
    </Container>
  );
};

