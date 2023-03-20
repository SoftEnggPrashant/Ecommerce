import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './components/NavComponent/Home';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import Products from './components/NavComponent/Products';
import Contact from './components/NavComponent/Contact';
import About from './components/NavComponent/About';
import SearchProduct from './components/NavComponent/SearchProduct';
import Login from './components/NavComponent/Login';
import Signup from './components/NavComponent/Signup';
import Profile from './components/NavComponent/Profile';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/searchproduct" element={<SearchProduct/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Signup/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
