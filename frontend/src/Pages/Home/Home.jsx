import { motion } from "framer-motion"; // Pour les animations
import "./Home.css";
import Logo from "../../assets/Transparent.png";
import SolutionSection from "../../components/solutions/SolutionsSection.jsx";
import ProductsPage from "../Products/ProductsPage.jsx";
import ContactSection from "../../components/Contact/ContactSection.jsx";
import Slideer from "./Slideer.jsx";
const App = () => {
  const images = [
    "https://supergros.ma/img/XCMG%20Picture%201.jpg",
    "https://supergros.ma/img/XCMG%20Picture%201.jpg",
  ];
  return (
    <>
      <div>
        <Slideer images={images} autoPlay={true} interval={12000} />
      </div>
      {/* Page principale */}
      <div className="full-page">
        <div className="content">
          {/* Section texte */}
          <motion.div
            className="text-section"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>
              Découvrez <span className="highlight">SUPERGROS</span> : votre
              partenaire de confiance
            </h1>
            <p>
              Bienvenue chez SUPERGROS, la référence incontournable pour tous
              vos besoins en engins lourds, véhicules de transport et
              équipements spécialisés. Explorez notre vaste gamme de produits
              adaptés à l’industrie, au BTP, et bien plus encore.
            </p>
            <div className="buttons">
              <motion.a
                href="#contact"
                className="btn-secondary"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Contact
              </motion.a>
            </div>
          </motion.div>

          {/* Section image */}
          <motion.div
            className="image-section"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="image-placeholder">
              <span>
                <img src={Logo} alt="Logo Supergros" />
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Autres sections */}
      <ProductsPage />
<SolutionSection/>
      <ContactSection />
    </>
  );
};

export default App;