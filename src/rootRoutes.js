import { createBrowserRouter } from "react-router-dom"

import App from "./App"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import Editor from "./components/Editor/Editor"
import Settings from "./components/Settings/Settings"
import Article from "./components/Article/Article"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/editor",
        element: <Editor />
    },
    {
        path: "/settings",
        element: <Settings />
    },
    {
        path: "/aritcle/:url",
        element: <Article />
    }
])

export default router