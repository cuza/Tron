import React from 'react';
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  }
]);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>

      <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
</QueryClientProvider>
  </React.StrictMode>
);
