import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthContextProvider } from './AuthContext';
import App from './App';
import "./stylesheets/normalize.css";
import "./stylesheets/stylesheet.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
