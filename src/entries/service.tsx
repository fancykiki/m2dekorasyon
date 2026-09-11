/**
 * Shared entry for every /hizmetler/<slug>/ page. The generated HTML puts the
 * slug on #root (data-service), so all five service pages share one JS chunk
 * and the browser caches it once.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { getService } from '../data/services';
import ServicePage from '../pages/ServicePage';
import '../index.css';

const el = document.getElementById('root');
const slug = el?.dataset.service ?? '';
const service = getService(slug);

if (el && service) {
  ReactDOM.createRoot(el).render(
    <React.StrictMode>
      <ServicePage service={service} />
    </React.StrictMode>
  );
}
