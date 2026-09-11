import React from 'react';
import ReactDOM from 'react-dom/client';
import ServicesIndexPage from '../pages/ServicesIndexPage';
import '../index.css';

const el = document.getElementById('root');
if (el) {
  ReactDOM.createRoot(el).render(
    <React.StrictMode>
      <ServicesIndexPage />
    </React.StrictMode>
  );
}
