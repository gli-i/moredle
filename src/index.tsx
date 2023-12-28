import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Classic from './pages/Classic';
import Timed from './pages/Timed';
import Stats from './pages/Stats';
import HowToPlay from './pages/HowToPlay';
import Admin from './pages/admin';
import GlobalStateProvider from './globalState';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/classic",
    element: <Classic />,
  },
  {
    path: "/sign-up",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/timed",
    element: <Timed />,
  },
  {
    path: "/stats",
    element: <Stats />
  },
  {
    path: "/howtoplay",
    element: <HowToPlay />
  }, 
  {
    path: "/admin",
    element: <Admin/>
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <>
      <GlobalStateProvider>
        <RouterProvider router={router} />
      </GlobalStateProvider>
    </>
);