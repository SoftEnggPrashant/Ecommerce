import { Routes, Route, useNavigate} from "react-router-dom";
import Home from "./components/NavComponent/Home";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import Products from "./components/NavComponent/Products";
import Contact from "./components/NavComponent/Contact";
import About from "./components/NavComponent/About";
import SearchProduct from "./components/NavComponent/SearchProduct";
import Login from "./components/NavComponent/Login";
import Signup from "./components/NavComponent/Signup";
import Profile from "./components/NavComponent/Profile";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import CardDetail from "./components/card/CardDetail";
import { toast } from "react-toastify";

function App() {

  const isAuthentication = ()=>{
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [profileData,setProfileData] = useState({});

  const navigate = useNavigate();

  const login = async (loginData) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/login",
        loginData
      );
      setProfileData(data.user)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setAuthenticated(true);
      navigate('/');

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setAuthenticated(isAuthentication());
  },[isAuthenticated]);
  

  return (
    <div className="wrapper">
      <Header isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/searchproduct" element={<SearchProduct />} />
        <Route path="/cardDetail/:id" element={<CardDetail />}/>
        <Route
          path="/login"
          element={
            <Login
              login={login}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Signup
              setProfileData={setProfileData}
              setAuthenticated={setAuthenticated}
            />
          }
        />
        <Route path="/profile" element={<Profile profileData={profileData} setAuthenticated={setAuthenticated} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
