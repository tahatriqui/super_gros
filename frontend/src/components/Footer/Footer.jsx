import "./Footer.css";
import { Facebook } from "lucide-react";
import { Instagram } from "lucide-react";
import { Linkedin } from "lucide-react";
import { useAppContext } from "../../AppContext";
import { Link } from "react-router-dom";

function Footer() {

  const {categories} =  useAppContext();
  return (
    <div id="footer" className="footer">
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
           {categories?.map((e,i)=>{
            return (
              <>
                <Link key={i}  >
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
              @Copyright {new Date().getFullYear()} Supergros.Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
