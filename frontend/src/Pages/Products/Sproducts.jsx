import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useAppContext } from "../../AppContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Products.css";

// Memoized Custom Arrows
const PrevArrow = React.memo(({ onClick }) => (
  <div className="arrow prev-arrow" onClick={onClick}>
    <FaChevronLeft size={25} />
  </div>
));

const NextArrow = React.memo(({ onClick }) => (
  <div className="arrow next-arrow" onClick={onClick}>
    <FaChevronRight size={25} />
  </div>
));

// Slider Settings (static to avoid re-creation on each render)
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

function Sproducts() {
  const { ssscategories } = useAppContext();
  const [filter, setFilter] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const { id, name } = useParams();

  useEffect(() => {
    // Make sure the categories are loaded before filtering
    if (ssscategories.length > 0) {
      const filtered = ssscategories.filter((e) => e.sscat_id == id);
      setFilter(filtered);

      // Redirect to another page if no matching category is found
      if (filtered.length === 0) {
        navigate(`/liste2/${id}`);
      } else if (!isLoaded) {
        setIsLoaded(true); // Mark as loaded only once
      }
    }
  }, [id, ssscategories, navigate, isLoaded]);

  return (
    <div className="products-container">
      {/* Header Section */}
      <div className="products-header">
        <div>
          <h1 className="products-title">{name}</h1>
          <p className="products-description">
            Découvrez notre large gamme de catégories.
          </p>
        </div>
      </div>

      {/* Slider Section */}
      <section className="products-slider">
        <Slider {...sliderSettings}>
          {filter.map((product) => (
            <div
              key={product.id}
              className={`product-card ${isLoaded ? "fade-in" : ""}`}
            >
              <div className="product-card-content">
                <img
                  src="https://www.groupe-premium.com/socopim/wp-content/uploads/2022/02/123-300x162.png"
                  alt={product.nom_ssscat}
                  className="product-image"
                  onError={(e) => (e.target.src = "/default-image.jpg")} // Fallback image
                />
                <h2 className="product-name">{product.nom_ssscat}</h2>
                <p className="product-desc">{product.desc}</p>
                <Link to={`/liste_pro/${product.id}`} className="details-btn">
                  Les categories
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </section>
    </div>
  );
}

export default Sproducts;
