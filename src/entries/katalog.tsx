import React from 'react';
import ReactDOM from 'react-dom/client';
import CatalogPage from '../pages/CatalogPage';
import '../index.css';

const el = document.getElementById('root');
if (el) {
  ReactDOM.createRoot(el).render(
    <React.StrictMode>
      <CatalogPage />
    </React.StrictMode>
  );
}
