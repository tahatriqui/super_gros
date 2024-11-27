import Nav from './components/Navbar/Nav';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home.jsx';
import Footer from './components/Footer/Footer.jsx';
import About from './Pages/About/About.jsx';
import Product_detail from'./Pages/Products/product_detail.jsx';
import Liste from './Pages/Products/liste.jsx';
import Liste2 from "./Pages/Products/liste2.jsx";
import { AppProvider } from './AppContext.jsx';
export default function App() {
  return (
    <>
      <AppProvider>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/about"} element={<About />} />
            <Route path={"/produit_det/:did"} element={<Product_detail />} />
            <Route path={"/liste_pro/:id"} element={<Liste />} />
            <Route path={"/liste2/:id"} element={<Liste2 />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AppProvider>
    </>
  );
}
