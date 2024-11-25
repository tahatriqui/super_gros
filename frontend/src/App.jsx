import Nav from './components/Navbar/Nav';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './Pages/Home/Home.jsx';
import Footer from './components/Footer/Footer.jsx';
import Slider from './Pages/Home/Slider.jsx';
import About from './Pages/About/About.jsx';
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/about"} element={<About />} />
        </Routes>
        <Footer /> 
      </BrowserRouter>
     
    </>
  );
}
