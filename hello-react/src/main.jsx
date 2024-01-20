import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App.jsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline } from '@mui/material';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Edit from './pages/Edit.jsx';
import AppRoot from "./AppRoot.jsx";
import { useState } from "react";

function AppRouter() {
  const [list, setList] = useState([
    { _id: 1, subject: 'Apple', done: false },
    { _id: 2, subject: 'Avocado', done: true },
    { _id: 3, subject: 'Mango', done: false },
  ]);

  const add = subject => {
    const _id = list[list.length - 1]._id + 1
    setList([...list, { _id, subject: subject, done: false }]);
  }

  const update = (_id, subject) => {
    if (!subject) return false;
    setList(list.map(item => {
      if (item._id === _id) item.subject = subject;      
    }
    ));
  }

  const remove = id => {
    setList(list.filter(n => n._id !== id));
  }

  const toggle = _id => {
    setList(list.map(item => {
      if (item._id == _id) item.done = !item.done;
      return item;
    }))
  }

  const clear = () => {
    setList(list.filter(item => !item.done));
  }

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AppRoot list={list} clear={clear} />,
      children: [
        {
          path: "/",
          element: <App list={list} add={add} remove={remove} toggle={toggle} />
        },
        {
          path: "/edit",
          element: <Edit list={list} update={update} />
        }
      ]
    }
  ])

  return (<RouterProvider router={routes}></RouterProvider>);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline />
    <AppRouter />
  </React.StrictMode>,
)
