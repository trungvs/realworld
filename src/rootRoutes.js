import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Header from "./components/Header/Header";
import App from "./App";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import HomePage from "./components/HomePage/HomePage";
import Editor from "./components/Editor/Editor";
import Settings from "./components/Settings/Settings";
import Article from "./components/Article/Article";
import Profile from "./components/Profile/Profile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/editor" element={<Editor />} />
      <Route path="/editor/:slug" element={<Editor />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/article/:slug" element={<Article />} />
      <Route path="/:username" element={<Profile />} />
    </Route>
  )
);

export default router;
