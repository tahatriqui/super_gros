import React from "react";
import "./footer.css";
// Pour les styles spécifiques au mode téléphone

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo et Newsletter */}
        <div className="footer-newsletter">
          <h2 className="footer-logo">Supergros</h2>
          <p>
            La qualité est notre promesse aux clients. Afin d'assurer la qualité
            et la fiabilité de nos produits, nous utilisons les technologies et
            les équipements de fabrication les plus avancés au monde.
          </p>
        </div>

        {/* Liens de Navigation */}
        <div className="footer-links">
          <div>
            <h3>Colonne Un</h3>
            <ul className="footer-list">
              <li>Lien Un</li>
              <li>Lien Deux</li>
              <li>Lien Trois</li>
              <li>Lien Quatre</li>
              <li>Lien Cinq</li>
            </ul>
          </div>
        </div>

        
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Supergros. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
