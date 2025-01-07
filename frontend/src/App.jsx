import Nav from './components/Navbar/Nav';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home.jsx';
import Footer from './components/Footer/Footer.jsx';
import About from './Pages/About/About.jsx';
import Product_detail from'./Pages/Products/product_detail.jsx';
import Liste from './Pages/Products/liste.jsx';
import Liste2 from "./Pages/Products/liste2.jsx";
import Page404 from './Pages/404/page404.jsx';
import { AppProvider, useAppContext } from './AppContext.jsx';
import Products from './Pages/Products/Products.jsx';
import ContactPage from './components/Contact/ContactPage.jsx';
import Sproducts from './Pages/Products/SProducts.jsx';
import Services from "./components/services/Services.jsx";
import ScrollToTop from './components/SrollTop.jsx';

export default function App() {
  
  return (
    <>
      <AppProvider>
        <BrowserRouter>
          <Nav />
          <ScrollToTop/>
            <Routes>  
              <Route path={"/"} element={<Home />} />
              <Route path={"/about"} element={<About />} />
              <Route path={"/sproduct/:id/:name"} element={<Sproducts />} />
              <Route path={"/product/:id/:name"} element={<Products />} />
              <Route path={"/produit_det/:did"} element={<Product_detail />} />
              <Route path={"/liste_pro/:id"} element={<Liste />} />
              <Route path={"/liste2/:id"} element={<Liste2 />} />
              <Route path={"/Services/:id"} element={<Services/>} />
              <Route path={"/contact"} element={<ContactPage/>} />
              {/* Catch-all route pour afficher la page 404 */}
              <Route path="*" element={<Page404 />} />
            </Routes>
         <FooterWithVh/>
        </BrowserRouter>
      </AppProvider>
    </>
  );
}
function FooterWithVh() {
  const { vh } = useAppContext();  // Access vh from the context
  return <Footer vh={vh} />;
}