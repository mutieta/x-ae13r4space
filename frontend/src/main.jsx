import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ Import BrowserRouter
import App from './App.jsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const CLIENT_ID = "197398670869-265ehi5kkmgu2rmgrsidaclm5oinq9g6.apps.googleusercontent.com";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <BrowserRouter> {/* ✅ Wrap App in BrowserRouter */}
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
