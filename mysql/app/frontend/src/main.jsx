import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
//import { initializeFaro, getWebInstrumentations } from '@grafana/faro-web-sdk';
//import { TracingInstrumentation } from '@grafana/faro-web-tracing';
// React Router v6 integration
import { matchRoutes } from 'react-router-dom';
import { initializeFaro, createReactRouterV6DataOptions, ReactIntegration, getWebInstrumentations, } from '@grafana/faro-react';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';
import App from './App.jsx';

const faroAppKey = import.meta.env.VITE_FARO_APP_KEY;
const faroEndpoint = import.meta.env.VITE_FARO_ENDPOINT;

if (faroAppKey && faroEndpoint) {
  initializeFaro({
    url: `${faroEndpoint}/${faroAppKey}`,
    app: {
      name: 'mysql-react-frontend',
      version: '1.0.0',
      environment: 'demo',
    },
    instrumentations: [
      ...getWebInstrumentations({ captureConsole: true }),
      new TracingInstrumentation(),
          // React integration for React applications.
      new ReactIntegration({
        router: createReactRouterV6DataOptions({
          matchRoutes,
        }),
      }),
    ],
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
