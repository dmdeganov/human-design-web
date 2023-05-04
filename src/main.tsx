import React from 'react';
import ReactDOM from 'react-dom/client';
import './translation/i18next.js';
import App from './App';
import '../sass/main.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
