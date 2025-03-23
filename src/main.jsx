import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Router from './Router/Router.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import {

  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast';

// Create a client
const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster/>
      </AuthProvider>
    </QueryClientProvider>

  </StrictMode>
);
