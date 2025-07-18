import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = document.getElementById('root');

createRoot(root).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="746403280432-4hn5r3sgi6r7bif2hf8r8gt9cck6lc8d.apps.googleusercontent.com">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
