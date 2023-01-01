import './App.css';
import Header from './component/layout/Header/Header';
import {BrowserRouter as Router,Route} from "react-router-dom"
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer.js";
import Homes from "./component/Home/Home.js";


function App() {

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  },[]);


  return (
    <Router>
      <Header/>
      <Route exact path="/" component={Homes} />
      <Footer/>
    </Router>
  );
}

export default App;
