import React, { useRef } from "react";
import { motion, useInView } from "framer-motion"; // Import Framer Motion
import "./ContactSection.css"; // Fichier CSS séparé

// Contact section pour la page home
const ContactSection = () => {
  // Refs for the sections
  const headerRef = useRef(null);
  const infoRef = useRef(null);
  const mapRef = useRef(null);

  // Visibility tracking
  const isHeaderInView = useInView(headerRef, { margin: "-100px 0px" });
  const isInfoInView = useInView(infoRef, { margin: "-100px 0px" });
  const isMapInView = useInView(mapRef, { margin: "-100px 0px" });

  return (
    <div className="contact-section" id="contact">
      {/* En-tête avec animation */}
      <motion.div
        ref={headerRef}
        className="contact-header"
        initial={{ opacity: 0, y: -50 }}
        animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
        transition={{ duration: 0.8 }}
      >
        <h2>Nous Contacter</h2>
        <p>
          Pour toute question, n'hésitez pas à nous contacter pour une
          assistance rapide et efficace.
        </p>
      </motion.div>

      {/* Informations de contact avec animation */}
      <motion.div
        ref={infoRef}
        className="contact-info"
        initial={{ opacity: 0 }}
        animate={isInfoInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="info-item">
          <span className="icon">📧</span>
          <div>
            <h4>Email</h4>
            <p>contact@supergros.ma</p>
          </div>
        </div>
        <div className="info-item">
          <span className="icon">📞</span>
          <div>
            <h4>Téléphone</h4>
            <p>(+212) 0537 58 69 76</p>
          </div>
        </div>
        <div className="info-item">
          <span className="icon">📍</span>
          <div>
            <h4>Bureau</h4>
            <p>223, Lot. Ain Al Hayat, 1/T501, R+2, Apt.3 Skhirat</p>
          </div>
        </div>
      </motion.div>

      {/* Carte avec animation */}
      <motion.div
        ref={mapRef}
        className="contact-image"
        initial={{ opacity: 0 }}
        animate={isMapInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10000!2d-6.80231!3d34.0347038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76bc6e7bbd199%3A0x272ecae98adaae73!2sStation+Tramway+Hassan+II!5e0!3m2!1sen!2sma!4v1635005869729!5m2!1sen!2sma"
          width="600"
          height="550"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </motion.div>
    </div>
  );
};

export default ContactSection;
