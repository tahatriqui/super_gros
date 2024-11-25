import "./Home.css"; // Assurez-vous d'ajouter les styles ici
import Logo from "../../assets/Transparent.png";
import SolutionSection from "./SolutionsSection.jsx";
import ProductsPage from "./ProductsPage.jsx";
import ContactSection from "./ContactSection.jsx";
import Slider from "./Slider.jsx";
function App() {
    return (   
      <>
        <div className="full-page">
          <div className="content">
            <div className="text-section">
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
                <button className="btn-primary">En savoir plus</button>
                <button className="btn-secondary">Contact</button>
              </div>
            </div>
            <div className="image-section">
              <div className="image-placeholder">
                <span>
                  <img src={Logo} alt="" />
                </span>
              </div>
            </div>
          </div>
        </div>
  
        <ProductsPage />
        <SolutionSection />
        <ContactSection />
      </>
    );
    
}


export default App;
