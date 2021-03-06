import React from 'react';

import AppRouter from './routes';
import AppLayout from './layouts/AppLayout';
import ThemeProvider from './contexts/ThemeContext';
import './styles/index.scss';
import '../../../src/demo.css'

function App() {
  return (
    <ThemeProvider>
      <AppLayout>
        <AppRouter />
      </AppLayout>
    </ThemeProvider>
  );
}

export default App;
