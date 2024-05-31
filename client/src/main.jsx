import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from './Components/Dashboard.jsx';
import Assets from './Components/Asset.jsx';
import AddAssets from './Components/AddAssetForm.jsx';
import DetailAssets from './Components/DetailAssets.jsx';
import MaintenanceTickets from './Components/Ticket.jsx';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/assets",
        element: <Assets />,
      },
      {
        path: "/tickets",
        element: <MaintenanceTickets />,
      },
      {
        path: "/AddAssets",
        element: <AddAssets />,
      },
      {
        path: "/assets/:id",
        element: <DetailAssets />,
      },
     
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={appRouter} />
 </React.StrictMode>,
)
