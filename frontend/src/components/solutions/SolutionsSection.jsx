import React, { useRef } from "react";
import { motion, useInView } from "framer-motion"; // Importation de Framer Motion
import "./SolutionsSection.css";

const SolutionsSection = () => {
  // Références pour suivre les sections
  const headerRef = useRef(null);
  const cardsContainerRef = useRef(null);

  // Vérifie si les sections sont visibles
  const isHeaderInView = useInView(headerRef, { margin: "-100px 0px" });
  const isCardsInView = useInView(cardsContainerRef, { margin: "-100px 0px" });

  return (
    <div className="section">
      {/* Animation pour le titre et le sous-titre */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: -50 }}
        animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
        transition={{ duration: 1 }}
      >
        <h2 className="title">Comment nous répondons à vos besoins spécifiques</h2>
        <p className="subtitle">
          Chez SUPERGROS, nous offrons des solutions personnalisées qui s'adaptent
          à vos exigences industrielles. Notre expertise couvre une large gamme
          d'équipements et de services pour garantir votre succès.
        </p>
      </motion.div>

      {/* Animation pour les cartes */}
      <motion.div
        ref={cardsContainerRef}
        className="cards-container"
        initial={{ opacity: 0 }}
        animate={isCardsInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 50 }}
          animate={isCardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
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
          animate={isCardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
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
          animate={isCardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
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
      </motion.div>
    </div>
  );
};

export default SolutionsSection;
