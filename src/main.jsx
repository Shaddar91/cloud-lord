import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import TrackingProvider from './providers/TrackingProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TrackingProvider>
      <App />
    </TrackingProvider>
  </React.StrictMode>
);
