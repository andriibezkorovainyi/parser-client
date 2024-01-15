import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import App from './App';
import './index.scss';
import { AccessProvider } from './contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AccessProvider>
      <App />
    </AccessProvider>
  </React.StrictMode>
);
