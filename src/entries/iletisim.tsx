import React from 'react';
import ReactDOM from 'react-dom/client';
import ContactPage from '../pages/ContactPage';
import '../index.css';

const el = document.getElementById('root');
if (el) {
  ReactDOM.createRoot(el).render(
    <React.StrictMode>
      <ContactPage />
    </React.StrictMode>
  );
}
