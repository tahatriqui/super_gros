import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Products.css";
import { useAppContext } from "../../AppContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Products() {
  const { sscategories } = useAppContext();
  const [filter, setFilter] = useState([]);
  const navigate = useNavigate();
  const { id, name } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);

  // Custom Previous Arrow
  const PrevArrow = ({ onClick }) => (
    <div
      className="arrow prev-arrow"
      onClick={(e) => {
        e.stopPropagation(); // Prevent event bubbling
        onClick(); // Call the slick slider's onClick
      }}
    >
      <FaChevronLeft size={25} />
    </div>
  );

  // Custom Next Arrow
  const NextArrow = ({ onClick }) => (
    <div
      className="arrow next-arrow"
      onClick={(e) => {
        e.stopPropagation(); // Prevent event bubbling
        onClick(); // Call the slick slider's onClick
      }}
    >
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
    if (sscategories.length > 0) {
      const filtered = sscategories.filter((e) => e.scat_id == id);
      setFilter(filtered);

      if (filtered.length === 0) {
        navigate(`/`); // Redirect to home if no category found
      } else {
        setIsLoaded(true); // Data loaded
      }
    }
  }, [id, sscategories, navigate]);

  return (
    <div className="products-container">
      {!isLoaded ? (
        <div className="loading-indicator">Chargement en cours...</div>
      ) : (
        <>
          {/* Header Section */}
          <div className="products-header">
            <h1 className="products-title">{name}</h1>
            <p className="products-description">
              Découvrez notre large gamme de catégories.
            </p>
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
                      alt={product.nom_scat}
                      className="product-image"
                      onError={(e) => (e.target.src = "/default-image.jpg")} // Fallback image
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
