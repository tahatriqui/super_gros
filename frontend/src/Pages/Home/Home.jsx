import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import "./Home.css";
import Logo from "../../assets/Transparent.png";
import SolutionSection from "../../components/solutions/SolutionsSection.jsx";
import ProductsPage from "../Products/ProductsPage.jsx";
import ContactSection from "../../components/Contact/ContactSection.jsx";
import Slideer from "./Slideer.jsx";
import { useAppContext } from "../../AppContext";

const App = () => {
   const { setVh } = useAppContext();
   setVh(14)
  const images = [
    "https://supergros.ma/img/XCMG%20Picture%201.jpg",
    "https://supergros.ma/img/XCMG%20Picture%201.jpg",
  ];

  // Refs for scroll detection
  const textSectionRef = useRef(null);
  const imageSectionRef = useRef(null);

  // Use the `useInView` hook to check if the sections are in view
  const isTextInView = useInView(textSectionRef, { margin: "-100px 0px" });
  const isImageInView = useInView(imageSectionRef, { margin: "-100px 0px" });

  return (
    <>
      {/* Slider Section */}
      <div style={{marginTop:"6rem"}}>
        <Slideer images={images} autoPlay={true} interval={12000} />
      </div>

      {/* Main Page Content */}
      <div className="full-page">
        <div className="content">
          {/* Text Section */}
          <motion.div
            ref={textSectionRef}
            className="text-section"
            initial={{ opacity: 0, x: -50 }}
            animate={isTextInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: .8}}
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
                href="/contact"
                className="btn-secondary"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Contact
              </motion.a>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            ref={imageSectionRef}
            className="image-section"
            initial={{ opacity: 0, x: 100 }}
            animate={isImageInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
            transition={{ duration: .8 }}
          >
            <div className="image-placeholder">
              <span>
                <img src={Logo} alt="Logo Supergros" style={{ border: "none" }} />
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Additional Sections */}
      <ProductsPage />
      <SolutionSection />
      <ContactSection />
    </>
  );
};

export default App;
