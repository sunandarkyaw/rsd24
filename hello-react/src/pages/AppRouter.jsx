import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Edit from './Edit.jsx';
import AppRoot from "./AppRoot.jsx";
import { useState } from "react";

export default function AppRouter() {
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
            return item;
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