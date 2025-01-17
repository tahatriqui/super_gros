import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer"; // Import the intersection observer
import "./About.css";
import Logo from "../../assets/Transparent.png";
import { useAppContext } from "../../AppContext";

// La page À propos de
const About = () => {
   const { setVh } = useAppContext();
   setVh(14)
  const allArticles = [
    {
      title: "Les grues",
      description:
        "Un appareil de levage et de manutention réservé aux lourdes charges. Cet engin de levage est construit de manière différente selon son utilisation. Chaque grue a une charte qui définit clairement sa capacité de levage en rapport avec le rayon et l'angle de la flèche.",
    },
    {
      title: "Les machines de terrassement",
      description:
        "Le choix des engins de terrassement est important car les travaux de terrassement sont une étape cruciale de tout chantier. Ils consistent à modifier le relief d’un terrain en déplaçant des quantités importantes de matériaux, en créant des ouvrages en remblai ou en déblai.",
    },
    {
      title: "Les machines de route",
      description:
        "SUPERGROS offre une catégorie complete de machines de construction routière. On dispose d’une gamme de matériels très spécialisés, performants et adaptés aux besoins des chantiers.",
    },
    {
      title: "Les excavateurs",
      description:
        "Des engins munis d’équipements destinés à détacher, prendre, transporter ou déverser de la terre, des pierres et d'autres matériaux.",
    },
    {
      title: "Les machines de béton",
      description:
        "Le béton est indispensable sur les chantiers de construction, SUPERGROS offre de nombreux matériels pour sa fabrication, sa livraison, son coulage et ses autres moyens de mise en œuvre.",
    },
    {
      title: "Les machines d'exploitations",
      description:
        "Nos véhicules embarquent des composants dont la performance et la fiabilité sont élevées pour les différents domaines d'exploitation (Minier, Forestier, Agriculture, Energie, Marine etc).",
    },
    {
      title: "Les machines d'empilage",
      description:
        "Un engin qui adopte un roulement de pivotement lourd et a une grande stabilité, avec une forte puissance, qui est suffisante pour satisfaire le client.",
    },
    {
      title: "Les machines de bois de charpente",
      description:
        "Une construction commence avec les machines professionnelles adéquates. SUPERGROS propose la solution idéale pour pratiquement chaque application. Une gamme complète de machines est à votre disposition et vous offre robustesse, puissance et efficacité.",
    },
  ];

  const [visibleArticles, setVisibleArticles] = useState(4);

  const handleLoadMore = () => {
    setVisibleArticles((prevVisible) => prevVisible + 4);
  };

  // Intersection observer hook
  const { ref: aboutRef, inView: aboutInView } = useInView({
    triggerOnce: true, // Trigger animation only once when it comes into view
    threshold: 0.2, // When 20% of the element is in view
  });

  const { ref: articlesRef, inView: articlesInView } = useInView({
    triggerOnce: false, // Trigger multiple times while scrolling
    threshold: 0.2,
  });

  return (
    <div>
      {/* Section À propos */}
      <section className="about-section" style={{ marginTop: "5.5rem" }}>
        <div className="about-container">
          {/* Animation sur le header */}
          <motion.div
            className="about-header"
            initial={{ opacity: 0, y: -20 }} // Initial state (hidden and slightly higher)
            animate={{ opacity: aboutInView ? 1 : 0, y: aboutInView ? 0 : -20 }} // Fade in and slide to normal position
            transition={{ duration: 0.8 }}
            ref={aboutRef} // Attach the intersection observer ref here
          >
            <h1 className="about-title">À propos de SUPERGROS</h1>
            <p className="about-subtitle">
              SUPERGROS, votre partenaire de confiance pour des équipements
              lourds et des solutions industrielles.
            </p>
          </motion.div>

          {/* Animation sur la description */}
          <motion.div
            className="about-description"
            initial={{ opacity: 0, y: 20 }} // Initial state (hidden and slightly lower)
            animate={{ opacity: aboutInView ? 1 : 0, y: aboutInView ? 0 : 20 }} // Fade in and slide to normal position
            transition={{ duration: 0.8, delay: 0.3 }}
            ref={aboutRef} // Attach the intersection observer ref here
          >
            <h2 className="about-highlight">
              Découvrez SUPERGROS : votre partenaire pour des solutions
              industrielles et commerciales.
            </h2>
            <p className="about-text">
              Depuis sa création, SUPERGROS s’engage à fournir des équipements
              de haute qualité pour divers secteurs, allant du BTP à
              l’agriculture. Nous vous apportons l’innovation, la fiabilité et
              un service client exceptionnel, visant à répondre aux besoins
              spécifiques de chaque client.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section Articles */}
      <section className="articles-section">
        <div className="articles-container">
          <header className="articles-header">
            <h2 className="articles-title">Découvrez nos articles</h2>
            <p className="articles-subtitle">
              Les machines de construction de SUPERGROS-XCMG couvrent une gamme
              étonnante d'équipements, y compris :
            </p>
          </header>

          <div className="articles-grid" ref={articlesRef}>
            {allArticles.slice(0, visibleArticles).map((article, index) => (
              <motion.div
                className="article-card"
                key={index}
                initial={{ opacity: 0, y: 20 }} // Initial state (hidden and slightly lower)
                animate={{ opacity: articlesInView ? 1 : 0, y: articlesInView ? 0 : 20 }} // Fade in and slide to normal position
                transition={{
                  duration: 0.6, // Duration of animation
                  delay: index * 0.1, // Stagger the animation for each article
                }}
              >
                <div className="article-image">
                  <img src={Logo} alt="Logo" />
                </div>
                <h3 className="article-title">{article.title}</h3>
                <p className="article-description">{article.description}</p>
              </motion.div>
            ))}
          </div>

          {/* "Voir tout" button */}
          {visibleArticles < allArticles.length && (
            <footer className="articles-footer">
              <motion.button
                className="articles-btn"
                onClick={handleLoadMore}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: visibleArticles * 0.1 }}
              >
                Voir tout
              </motion.button>
            </footer>
          )}
        </div>
      </section>
    </div>
  );
};

export default About;
