import { motion, useInView } from "framer-motion"; // Importation de Framer Motion
import { useRef } from "react"; // For refs
import "./ProductsPage.css"; // Fichier CSS séparé

const ProductsPage = () => {
  // Create refs for each card
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);

  // Detect visibility of each card
  const isCard1InView = useInView(card1Ref, { margin: "-100px 0px" });
  const isCard2InView = useInView(card2Ref, { margin: "-100px 0px" });
  const isCard3InView = useInView(card3Ref, { margin: "-100px 0px" });
  const isCard4InView = useInView(card4Ref, { margin: "-100px 0px" });

  return (
    <div className="products-page">
      <div className="headerr">
        <h2>Découvrez notre large gamme de produits</h2>
        <p>
          Nous offrons une variété d'équipements lourds et de véhicules adaptés
          à tous vos besoins. Explorez nos solutions pour le BTP, l'industrie,
          et bien plus encore.
        </p>
      </div>
      <div className="cards-container">
        {/* Animated Cards */}
        <motion.div
          ref={card1Ref}
          className="card"
          initial={{ opacity: 0, y: 50 }}
          animate={isCard1InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
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
          ref={card2Ref}
          className="card"
          initial={{ opacity: 0, y: 50 }}
          animate={isCard2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="icon">⚙️</div>
          <h3>Équipements spéciaux pour des missions spécifiques</h3>
          <p>
            Découvrez les équipements pour la lutte contre l&apos;incendie et les
            interventions d&apos;urgence.
          </p>
        </motion.div>

        <motion.div
          ref={card3Ref}
          className="card"
          initial={{ opacity: 0, y: 50 }}
          animate={isCard3InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="icon">🔧</div>
          <h3>Pièces de rechange pour tous vos équipements</h3>
          <p>
            Assurez la longévité de vos machines grâce à notre stock de pièces
            de rechange de qualité.
          </p>
        </motion.div>

        <motion.div
          ref={card4Ref}
          className="card"
          initial={{ opacity: 0, y: 50 }}
          animate={isCard4InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
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
    </div>
  );
};

export default ProductsPage;
