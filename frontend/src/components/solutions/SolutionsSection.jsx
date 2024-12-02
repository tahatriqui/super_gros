import React from "react";
import { motion } from "framer-motion"; // Importation de Framer Motion
import "./SolutionsSection.css";

const SolutionsSection = () => {
  return (
    <div className="section">
      <h2 className="title">
        Comment nous répondons à vos besoins spécifiques
      </h2>
      <p className="subtitle">
        Chez SUPERGROS, nous offrons des solutions personnalisées qui s'adaptent
        à vos exigences industrielles. Notre expertise couvre une large gamme
        d'équipements et de services pour garantir votre succès.
      </p>
      <div className="cards-container">
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="icon">⚙️</div>
          <h3 className="card-title">
            Nos services adaptés à votre secteur d'activité
          </h3>
          <p className="card-description">
            Nous proposons des solutions sur mesure pour chaque secteur, que ce
            soit le BTP, l'agriculture ou le bâtiment.
          </p>
        </motion.div>

        <motion.div
          className="card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="icon">🎯</div>
          <h3 className="card-title">
            Une approche personnalisée pour chaque client
          </h3>
          <p className="card-description">
            Nous analysons vos besoins pour vous fournir les meilleures options
            disponibles.
          </p>
        </motion.div>

        <motion.div
          className="card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="icon">✅</div>
          <h3 className="card-title">
            Engagement envers la qualité et la satisfaction
          </h3>
          <p className="card-description">
            Votre satisfaction est notre priorité, et nous nous engageons à
            fournir des produits de haute qualité.
          </p>
        </motion.div>
      </div>
      
    </div>
  );
};

export default SolutionsSection;
