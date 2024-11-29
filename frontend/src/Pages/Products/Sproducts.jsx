import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Products.css";
import { useAppContext } from "../../AppContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Sproducts() {
  const { ssscategories} = useAppContext();
  const [filter, setFilter] = useState([]);
  const navigate = useNavigate();
  const { id, name } = useParams();

  const [isLoaded, setIsLoaded] = useState(false);

  // Custom Previous Arrow
  const PrevArrow = ({ onClick }) => (
    <div className="arrow prev-arrow" onClick={onClick}>
      <FaChevronLeft size={25} />
    </div>
  );

  // Custom Next Arrow
  const NextArrow = ({ onClick }) => (
    <div className="arrow next-arrow" onClick={onClick}>
      <FaChevronRight size={25} />
    </div>
  );

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // Tablets
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // Smaller tablets and phones
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

 useEffect(() => {
  // Make sure the sscategories are loaded before proceeding
  if (ssscategories.length > 0) {
    const filtered = ssscategories.filter((e) => e.sscat_id == id);
    setFilter(filtered);

    // If no category is found, redirect to home
    if (filtered.length === 0) {
      navigate('/');
    } else {
      setIsLoaded(true);  // Trigger the animation when data is loaded
    }
  }
}, [id, ssscategories, navigate]);
  return (
    <div className="products-container">
      {/* Header Section */}
      <div className="products-header">
        <div>
          <h1 className="products-title">{name}</h1>
          <p className="products-description">Découvrez notre large gamme de produits.</p>
        </div>
        <button className="view-all-btn" onClick={() => console.log("Voir tout")}>
          Voir tout
        </button>
      </div>

      {/* Slider Section */}
      <section className="products-slider">
        <Slider {...sliderSettings}>
          {filter.map((product) => (
            <div key={product.id} className={`product-card ${isLoaded ? "fade-in" : ""}`}>
              <div className="product-card-content">
                <img
                  src="https://www.groupe-premium.com/socopim/wp-content/uploads/2022/02/123-300x162.png"
                  alt={product.nom_ssscat}
                  className="product-image"
                />
                <h2 className="product-name">{product.nom_ssscat}</h2>
                <p className="product-desc">{product.desc}</p>
                <Link to={`/produit_det/${product.id}`} className="details-btn">Détails</Link>
              </div>
            </div>
          ))}
        </Slider>
      </section>
    </div>
  );
}

export default Sproducts;
