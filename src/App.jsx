import './App.css';

// import { RouterProvider } from "react-router-dom"
// import router from './rootRoutes';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './components/HomePage/HomePage';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

function App() {
  return (
    <div className="App"> 
        {/* <Header /> */}
        {/* <RouterProvider router={router}> */}
          <HomePage />
          {/* <Login /> */}
          {/* <Register /> */}
          <Footer />
        {/* </RouterProvider> */}
    </div>
  );
}

export default App;
