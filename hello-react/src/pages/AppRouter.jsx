import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Edit from './Edit.jsx';
import AppRoot from "./AppRoot.jsx";
import { useEffect, useState } from "react";

const api = "http://localhost:8888/tasks";

export default function AppRouter() {
    const [list, setList] = useState([]);
    const [isLoading, setIsLoaing] = useState(true);

    useEffect(() => {
        (async () => {
            const res = await fetch(api);
            const data = await res.json();
            setList(data);
            setIsLoaing(false);
        })();
    }, []);

    const add = async (subject) => {
        if (!subject) return false;

        const res = await fetch(api, {
            method: 'post',
            body: JSON.stringify({ subject }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();
        setList([...list, data]);
    }

    const update = async (_id, subject) => {
        if (!subject) return false;

        const res = await fetch(`${api}/${_id}`, {
            method: 'put',
            body: JSON.stringify({ subject }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        setList(list.map(item => {
            if (item._id === _id) item.subject = subject;
            return item;
        }
        ));
    }

    const remove = _id => {
        fetch(`${api}/${_id}`, { method: 'delete' });
        setList(list.filter(n => n._id !== _id));
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
            element: <AppRoot isLoading={isLoading} list={list} clear={clear} />,
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