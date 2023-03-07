import './App.css';
import axios from 'axios';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from "react-router-dom"
import { useUserContext } from "./contexts/user_context"
import { getCurrentUser } from "./components/User/UserServices"
import { useEffect } from 'react';

function App() {

  const { isLogin, userInfo, handleSetLogin } = useUserContext()

  const userToken = localStorage.getItem("jwtToken")

  if (userToken && !isLogin) {
    getCurrentUser()
      .then(res => {
        handleSetLogin(res.data.user)
        localStorage.setItem("jwtToken", JSON.stringify(res.data.user.token))
      })
      .catch(err => {
        handleSetLogin([])
        localStorage.removeItem("jwtToken")
      })
  }

  axios.interceptors.request.use(async function (config) {
    const token = await new Promise((resolve) => {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        resolve(`Token ${JSON.parse(token)}`);
      } else {
        resolve(null);
      }
    });
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  // axios.interceptors.request.use(async function (config) {
  //   const token = await new Promise((resolve) => {
  //     const token = localStorage.getItem("jwtToken");
  //     if (token) {
  //       resolve(`Token ${JSON.parse(token)}`);
  //     } else {
  //       resolve(null);
  //     }
  //   });
  //   if (token) {
  //     config.headers.Authorization = token;
  //   }
  //   return config;
  // }, function (error) {
  //   return Promise.reject(error);
  // });


  return (
    <div className="App">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;