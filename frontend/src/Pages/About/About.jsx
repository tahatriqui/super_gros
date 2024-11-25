import React from "react";
import "./About.css"; // Styles pour les deux sections
import Logo from "../../assets/Transparent.png";
const About = () => {
  return (
    <div>
      {/* Section À propos */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-header">
            <h1 className="about-title">À propos de SUPERGROS</h1>
            <p className="about-subtitle">
              SUPERGROS, votre partenaire de confiance pour des équipements
              lourds et des solutions industrielles.
            </p>
          </div>

          <div className="about-description">
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
          </div>
        </div>
      </section>

      {/* Section Articles */}
      <section className="articles-section">
        <div className="articles-container">
          <div className="articles-header">
            <h2 className="articles-title">Découvrez nos articles</h2>
          </div>
          <div className="articles-grid">
            {/* Card 1 */}
            <div className="article-card">
              <div className="article-image">
                {" "}
                <img src={Logo} alt="Logo" />
              </div>
              <h3 className="article-title">Les grues</h3>
              <p className="article-description">
                Un appareil de levage et de manutention réservé aux lourdes
                charges. Cet engin de levage est construit de manière différente
                selon son utilisation. Chaque grue a une charte qui définit
                clairement sa capacité de levage en rapport avec le rayon et
                l'angle de la flèche.
              </p>
            </div>
            {/* Card 2 */}
            <div className="article-card">
              <div className="article-image">
                <img src={Logo} alt="Logo" />
              </div>
              <h3 className="article-title">Les machines de terrassement</h3>
              <p className="article-description">
                Le choix des engins de terrassement est important car les
                travaux de terrassement sont une étape cruciale de tout
                chantier. Ils consistent à modifier le relief d’un terrain en
                déplaçant des quantités importantes de matériaux, en créant des
                ouvrages en remblai ou en déblai.
              </p>
            </div>
            {/* Card 3 */}
            <div className="article-card">
              <div className="article-image">
                {" "}
                <img src={Logo} alt="Logo" />
              </div>
              <h3 className="article-title">Les machines de route</h3>
              <p className="article-description">
                SUPERGROS offre une catégorie complete de machines de
                construction routière. On dispose d’une gamme de matériels très
                spécialisés, performants et adaptés aux besoins des chantiers.
              </p>
            </div>
            {/* Card 4 */}
            <div className="article-card">
              <div className="article-image">
                {" "}
                <img src={Logo} alt="Logo" />
              </div>
              <h3 className="article-title">Les excavateurs</h3>
              <p className="article-description">
                Des engins munis d’équipements destinés à détacher, prendre,
                transporter ou déverser de la terre, des pierres et d'autres
                matériaux.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
