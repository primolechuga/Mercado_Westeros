import { CssBaseline } from '@mui/material'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'
import { AuthProvider } from './contexts/authContext.tsx'
import { BrowserRouter as Router } from 'react-router-dom';

// import { createTheme } from '@mui/material/styles';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#0628a6',
//     },
//     secondary: purple,
//   },
// });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Router>
      <CssBaseline />
        <AuthProvider>
          <App />
        </AuthProvider>
    </Router>
  </StrictMode>,
)

