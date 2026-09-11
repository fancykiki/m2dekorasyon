import React from 'react';
import ReactDOM from 'react-dom/client';
import ProjectsPage from '../pages/ProjectsPage';
import '../index.css';

const el = document.getElementById('root');
if (el) {
  ReactDOM.createRoot(el).render(
    <React.StrictMode>
      <ProjectsPage />
    </React.StrictMode>
  );
}
