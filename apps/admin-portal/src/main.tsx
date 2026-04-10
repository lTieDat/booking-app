import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/styles/global.css';
import { AppProviders } from './app/providers';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AppProviders />
  </React.StrictMode>
);
