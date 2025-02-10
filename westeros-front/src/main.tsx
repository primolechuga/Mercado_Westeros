import { CssBaseline } from '@mui/material'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'
import { AuthProvider } from './contexts/authContext.tsx'
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from "@mui/material/styles";

import { createTheme } from '@mui/material/styles';

//paleta = #56828C, #395359 ,#F2F2F2, #A6A6A6, #0D0D0D
const theme = createTheme({
  palette: {
    primary: {
      main: "#9BB5BF",
  },
  secondary: {
      main: "#202E40",
  },
  background: {
      default: "#FFF9ED",
  },
  text: {
      primary: "#0D0D0D",
      secondary: "#A6A6A6",
  },
}
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  </StrictMode>
);
