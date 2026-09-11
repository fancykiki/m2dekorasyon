import React from 'react';
import ReactDOM from 'react-dom/client';
import AboutPage from '../pages/AboutPage';
import '../index.css';

const el = document.getElementById('root');
if (el) {
  ReactDOM.createRoot(el).render(
    <React.StrictMode>
      <AboutPage />
    </React.StrictMode>
  );
}
