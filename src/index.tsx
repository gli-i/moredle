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
import Blanks from './pages/Blanks';
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
    path: "/sign-up",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/classic",
    element: <Classic />,
  },
  {
    path: "/timed",
    element: <Timed />,
  },
  {
    path: "/blanks",
    element: <Blanks />
  },
  {
    path: "/stats",
    element: <Stats />
  },
  {
    path: "/howtoplay",
    element: <HowToPlay />
  }, 
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <>
      <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
      <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>
      <GlobalStateProvider>
        <RouterProvider router={router} />
      </GlobalStateProvider>
    </>
);