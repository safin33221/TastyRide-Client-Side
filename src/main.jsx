import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Router from './Router/Router.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import {

  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n.js';
import { Toaster } from 'react-hot-toast';

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <I18nextProvider i18n={i18n}>
          <Router />
          <Toaster/>
        </I18nextProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
