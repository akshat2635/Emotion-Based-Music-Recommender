import React from 'react';
// import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Predictions from './components/Predictions';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App/>
    ),
  },
  {
    path: "/angry",
    element: (
      <>
      <Navbar/>
      <Predictions mood={"angry"}/>
      </>
    )
  },
  {
    path: "sad",
    element: (
      <>
      <Navbar/>
      <Predictions mood={"sad"}/>
      </>
    )
  },
  {
    path: "calm",
    element: (
      <>
      <Navbar/>
      <Predictions mood={"neutral"}/>
      </>
    )
  },
  {
    path: "/happy",
    element: (
      <>
      <Navbar/>
      <Predictions mood={"happy"}/>
      </>
    )
  },
  {
    path: "image",
    element: (
      <>
      <Navbar/>
      <Predictions mood={"happy"}/>
      </>
    )
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
