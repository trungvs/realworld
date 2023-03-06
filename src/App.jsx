import './App.css';
import axios from 'axios';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from "react-router-dom"
import { useUserContext } from "./contexts/user_context"
import { getCurrentUser } from "./components/User/UserServices"

function App() {

  const { isLogin, userInfo, handleSetLogin } = useUserContext()

  const userToken = localStorage.getItem("jwtToken")

  if (userToken && !isLogin) {
    getCurrentUser()
      .then(res => {
        handleSetLogin(res.data.user)
      })
      .catch(err => {
        handleSetLogin([])
        localStorage.removeItem("jwtToken")
      })
  }

  axios.interceptors.request.use(function (config) {
    if (localStorage.getItem("jwtToken")) {
      config = {
        ...config,
        headers: {
          ...config.headers,
          Authorization: "Token " + JSON.parse(localStorage.getItem("jwtToken"))
        }
      }
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  // axios.interceptors.response.use(function (response) {
  //   dispatch(closeLoading())
  //   if (response.data.code === 401 || 403) {
  //     // toast.warning(response.data.message)s
  //   }
  //   return response;
  // }, function (error) {
  //   dispatch(closeLoading())
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