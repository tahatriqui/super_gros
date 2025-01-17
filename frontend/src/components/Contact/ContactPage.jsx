import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion"; // Import motion
import "./ContactPage.css";
import { useAppContext } from "../../AppContext";

function ContactPage() {
  const { setVh } = useAppContext();
   setVh(14)
  return (
    <div className="allContent">
      <div className="cc">
        {/* first part */}
        <motion.div
          className="contacct-info"
          initial={{ opacity: 0, x: -50 }} // Start off-screen to the left
          animate={{ opacity: 1, x: 0 }} // Animate to visible and in position
          transition={{ duration: 1 }} // 1 second duration
        >
          <h2>Contactez-Nous</h2>
          <p>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> 223, Lot. Ain Al Hayat, 1/T501, R+2, Apt.3 Skhirat
          </p>
          <p>
            <FontAwesomeIcon icon={faEnvelope} /> contact@supergros.ma
          </p>
          <p>
            <FontAwesomeIcon icon={faPhone} /> (+212) 0537 58 69 76
          </p>
        </motion.div>

        {/* second part */}
        <motion.div
          className="contact-form"
          initial={{ opacity: 0, x: 50 }} // Start off-screen to the right
          animate={{ opacity: 1, x: 0 }} // Animate to visible and in position
          transition={{ duration: 1, delay: 0.5 }} // Delay for second part
        >
          <h2>Contactez-Nous</h2>
          <p>
            Vous avez des questions ou besoin d'aide ? Contactez-nous en utilisant
            le formulaire de contact ci-dessous. Notre équipe du Groupe SUPERGROS
            est là pour vous aider.
          </p>
          <form action="#" method="">
            <input type="text" name="name" placeholder="Nom" required />
            <input type="email" name="email" placeholder="Email" required />
            <textarea name="message" placeholder="Message" required></textarea>
            <button type="submit">Envoyer</button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default ContactPage;
