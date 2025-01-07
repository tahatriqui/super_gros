import { motion } from "framer-motion"; // Importer Framer Motion
import "./Services.css";
import { sdata } from "../../../public/solutionData";
import { useParams } from "react-router-dom";
// il affiche les services pour le site 
const Services = () => {
  const { id = 0 } = useParams();
  const services = sdata[id].services;

  const articles = sdata[id].categories;

  return (
    <div style={{marginTop:"6rem"}}>
      {/* En-tête avec animation de mouvement */}
      <motion.header
        className="header-section"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={sdata[id].big_img}
          alt="Stockage et Assemblage"
          className="header-image"
        />
        <div className="header-text">
          <motion.h1
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            {sdata[id].title}
          </motion.h1>
          <motion.p
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            {sdata[id].desc}
          </motion.p>
        </div>
      </motion.header>

      {/* Section des services avec animations */}
      <motion.section
        className="services"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 1 } },
        }}
      >
        <div className="services__container">
          {services
            ? services.map((service, i) => (
                <motion.div
                  key={`${i}-${service.name}`}
                  className="service-card"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: service.id * 0.3, duration: 0.8 }}
                >
                  <div className="service-card__icon">
                    <img src={service.serv_img} alt="" />
                  </div>
                  <motion.h4
                    className="service-card__title"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {service.serv_name}
                  </motion.h4>
                </motion.div>
              ))
            : ""}
        </div>
      </motion.section>

      {/* Section des articles avec animation de mouvement */}
      <motion.section
        className="articles"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 1 } },
        }}
      >
        <div className="articles__container">
          {articles
            ? articles.map((article, i) => (
                <motion.div
                  key={i}
                  className="article-card"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.3, duration: 0.8 }}
                >
                  <div className="article-card__image">
                    <img
                      src={
                        article.cat_img || "https://via.placeholder.com/300x200"
                      }
                      alt="test"
                    />
                  </div>
                  <div className="article-card__content">
                    <motion.p
                      className="article-card__description"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      {article.cat_desc}
                    </motion.p>
                  </div>
                </motion.div>
              ))
            : ""}
        </div>
      </motion.section>
    </div>
  );
};

export default Services;
