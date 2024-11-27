import React from "react";
import { motion } from "framer-motion"; // Importation de Framer Motion
import "./ProductsPage.css"; // Fichier CSS séparé

const ProductsPage = () => {
  return (
    <div className="products-page">
      <div className="header">
        <h2>Découvrez notre large gamme de produits</h2>
        <p>
          Nous offrons une variété d'équipements lourds et de véhicules adaptés
          à tous vos besoins. Explorez nos solutions pour le BTP, l'industrie,
          et bien plus encore.
        </p>
      </div>
      <div className="cards-container">
        {/* Animation de la carte */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="icon">🚛</div>
          <h3>Véhicules de transport adaptés à vos besoins</h3>
          <p>
            Des camions aux minibus, nous avons des solutions pour chaque
            secteur d'activité.
          </p>
        </motion.div>

        <motion.div
          className="card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="icon">⚙️</div>
          <h3>Équipements spéciaux pour des missions spécifiques</h3>
          <p>
            Découvrez les équipements pour la lutte contre l'incendie et les
            interventions d'urgence.
          </p>
        </motion.div>

        <motion.div
          className="card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration:1, delay: 0.4 }}
        >
          <div className="icon">🔧</div>
          <h3>Pièces de rechange pour tous vos équipements</h3>
          <p>
            Assurez la longévité de vos machines grâce à notre stock de pièces
            de rechange de qualité.
          </p>
        </motion.div>

        <motion.div
          className="card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="icon">🍞</div>
          <h3>Matériel de boulangerie et restauration professionnel</h3>
          <p>
            Nous vous proposons des solutions innovantes pour la boulangerie et
            la restauration.
          </p>
        </motion.div>
      </div>
      <div className="buttons">
        <button className="btn-primary">Explorer</button>
      </div>
    </div>
  );
};

export default ProductsPage;
