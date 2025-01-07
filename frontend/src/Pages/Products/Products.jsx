import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useAppContext } from "../../AppContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Products.css";

// Memoized Arrows
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

// Slider Settings
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 768, settings: { slidesToShow: 1 } },
  ],
};

function Products() {
  const { sscategories } = useAppContext();
  const [filter, setFilter] = useState([]);
  const navigate = useNavigate();
  const { id, name } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (sscategories.length > 0) {
      const filtered = sscategories.filter((e) => e.scat_id == id);
      setFilter(filtered);

      if (filtered.length === 0) {
        navigate(`/`);
      } else if (!isLoaded) {
        setIsLoaded(true);
      }
    }
  }, [id, sscategories, navigate, isLoaded]);

  return (
    <div className="products-container">
      {!isLoaded ? (
        <div className="loading-indicator">Chargement en cours...</div>
      ) : (
        <>
          <div className="products-header">
            <h1 className="products-title">{name}</h1>
            <p className="products-description">
              Découvrez notre large gamme de catégories.
            </p>
          </div>
          <section className="products-slider">
            <Slider {...sliderSettings}>
              {filter.map((product) => (
                <div key={product.id} className="product-card fade-in">
                  <div className="product-card-content">
                    <img
                      src="https://www.groupe-premium.com/socopim/wp-content/uploads/2022/02/123-300x162.png"
                      alt={product.nom_scat}
                      className="product-image"
                      onError={(e) => (e.target.src = "/default-image.jpg")}
                    />
                    <h2 className="product-name">{product.nom_scat}</h2>
                    <p className="product-desc">{product.desc}</p>
                    <Link
                      to={`/sproduct/${product.id}/${product.nom_scat}`}
                      className="details-btn"
                    >
                      Voir plus
                    </Link>
                  </div>
                </div>
              ))}
            </Slider>
          </section>
        </>
      )}
    </div>
  );
}

export default Products;
