import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"

import Header from "./components/Header/Header"
import App from "./App"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import HomePage from "./components/HomePage/HomePage"
import Editor from "./components/Editor/Editor"
import Settings from "./components/Settings/Settings"
import Article from "./components/Article/Article"

// const router = createBrowserRouter([
//     {
//         element: <App />
//     },
//     {
//         path: "/login",
//         element: <Login />
//     },
//     {
//         path: "/register",
//         element: <Register />
//     },
//     {
//         path: "/editor",
//         element: <Editor />
//     },
//     {
//         path: "/settings",
//         element: <Settings />
//     },
//     {
//         path: "/aritcle/:url",
//         element: <Article />
//     }
// ])

const router = createBrowserRouter(createRoutesFromElements(
    <Route element={<App />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/article/:url" element={<Article />} />
    </Route>
))

export default router