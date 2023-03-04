import './App.css';
import axios from 'axios';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from "react-router-dom"
import { useUserContext } from "./contexts/user_context"
import { useEffect } from 'react';

function App() {

  const { isLogin, userInfo } = useUserContext()

  axios.defaults.headers.common['Authorization'] = "Token " + userInfo?.token || ""
  return (
    <div className="App"> 
        <Header />
        <Outlet />
        <Footer />
    </div>
  );
}

export default App;