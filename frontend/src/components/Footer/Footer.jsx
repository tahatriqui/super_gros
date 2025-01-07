import "./Footer.css";
import { Facebook } from "lucide-react";
import { Instagram } from "lucide-react";
import { Linkedin } from "lucide-react";
import { useAppContext } from "../../AppContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Footer({vh}) {
  console.log(typeof(vh));
  

  const {categories} =  useAppContext();
 const [deviceType, setDeviceType] = useState('');

  // Function to determine the device type based on window width
  const determineDeviceType = () => {
    const width = window.innerWidth;
    if (width <= 768) {
      setDeviceType('phone'); // Phone (small devices)
    } else if (width <= 1024) {
      setDeviceType('tablet'); // Tablet (medium devices)
      
    }else if (width <= 1440) {
      setDeviceType('mac'); // Tablet (medium devices)
      
    } else {
      setDeviceType('pc'); // PC (large devices)
    }
  };

  // Use effect to update the device type on mount and on window resize
  useEffect(() => {
    determineDeviceType(); // Determine the device on initial load
    window.addEventListener('resize', determineDeviceType); // Add resize listener

    return () => {
      window.removeEventListener('resize', determineDeviceType); // Clean up the listener on unmount
    };
  }, []);

  // Conditional margin-top based on device type and vh value
  let marginTop;
  if (deviceType === 'phone') {
    marginTop = vh === 0 ? '14vh' : `${vh * 3}vh`; // More margin on phone
  } else if (deviceType === 'tablet') {
    marginTop = vh === 0 ? '10vh' : `${vh * 1.2}vh`; // Slightly smaller margin on tablet
  }else if (deviceType === 'mac') {
    marginTop = vh === 0 ? '10vh' : `${vh * 1.44}vh`; // Slightly smaller margin on tablet
  }
   else {
    marginTop = vh === 0 ? '6vh' : `${vh * 1}vh`; // Smaller margin on PC
  }

  return (
    <footer
      id="footer"
      className="footer" // Tailwind for other styles
      style={{
        marginTop: marginTop, // Apply dynamic margin-top based on device type
      }}
    >
      <div className="sb-footer-section-padding">
        <div className="sb-footer-links">
          <div className="sb-footer-links-div">
            <h4>Supergros</h4>
            <p>
              La qualité est notre promesse aux clients. Afin d'assurer la
              qualité et la fiabilité de nos produits, nous utilisons les
              technologies et les équipements de fabrication les plus avancés au
              monde.
            </p>
          </div>
          <div className="sb-footer-links-div">
            <h4>Les categories</h4>
            {categories?.map((e, i) => {
              return (
                <>
                  <Link key={i}>
                    <p>{e.nom_cat}</p>
                  </Link>
                </>
              );
            })}
          </div>
          <div className="sb-footer-links-div">
            <h4>Contactez-nous</h4>
            <a
              href="https://www.google.com/maps?q=223,+Lot.+Ain+Al+Hayat+1/T501,+R%2B2,+Apt.3,+Skhirat"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>223, Lot. Ain Al Hayat , 1/T501, R+2, Apt.3 Skhirat</p>
            </a>
            <a href="mailto:contact@supergros.ma">
              <p>contact@supergros.ma</p>
            </a>
            <a href="tel:0537586976">
              <p>0537 58 69 76</p>
            </a>
          </div>

          <div className="sb-footer-links-div">
            <h4>Suivez-nous</h4>
            <div className="socialmedia">
              <p></p>
              <p style={{ marginRight: "4px" }}>
                <Facebook />
              </p>
              <p style={{ marginRight: "8px" }}>
                <Instagram />
              </p>
              <p>
                <Linkedin />
              </p>
            </div>
          </div>
        </div>
        <hr></hr>

        <div className="sb-footer-below">
          <div className="sb-footer-copyright">
            <p>
              @Copyright {new Date().getFullYear()} Supergros.Tous droits
              réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
