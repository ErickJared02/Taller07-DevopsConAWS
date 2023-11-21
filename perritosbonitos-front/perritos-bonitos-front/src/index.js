import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import "./styles.css";

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material/styles';

import theme from './theme';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>

  </ThemeProvider>,
);
