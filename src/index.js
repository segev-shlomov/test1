import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  redirect,
  Link,
} from "react-router-dom";
import Task1 from './components/Task1';
import {Theme} from '@carbon/react';
import Task4 from './components/Task4';
import Task2 from './components/Task2';
import Task3 from './components/Task3';
const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: "/",
    element: <Task1/>
    
  },
  {
    path: "/task1",
    element: <Task1/>
  },
  {
    path: "/task2",
    element: <Task2/>
  },
  {
    path: "/task3",
    element: <Task3/>
  },
  {
    path: "/task4",
    element: <Task4/>
  }
]);

root.render(
  <Provider  store={store}>
  <RouterProvider router={router} />
  </Provider>
);


// root.render(
//     <App />
//   </Provider>
// );



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
