import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Notis from "./pages/Notis";
import Post from "./pages/Post";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/posts/:id",
        element: <Post />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/profile/:id",
        element: <Profile />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/notis",
        element: <Notis />
      }
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}