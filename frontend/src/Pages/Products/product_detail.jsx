import { motion } from "framer-motion";
import "./product_detail.css";
import Logo from "../../assets/Transparent.png";
import { useAppContext } from "../../AppContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductDetail = () => {
  const [selectedVariant, setSelectedVariant] = useState("Select");
  const [quantity, setQuantity] = useState(1);
  const [findedProduct, setFindedProduct] = useState({});
  const [showDetails, setShowDetails] = useState(false); // Ajout d'un état pour afficher/masquer les détails

  const { did } = useParams();
  const { filteredProducts } = useAppContext();

  useEffect(() => {
    const filter = filteredProducts.find((e) => e.id == did);
    if (filter) {
      setFindedProduct({
        ...filter,
        details:
          typeof filter.details === "string"
            ? JSON.parse(filter.details)
            : filter.details,
      });
    }
  }, [did, filteredProducts]);

  return (
    <div className="product-page">
      {/* Image Section */}
      <motion.div
        className="product-image-section"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="image-slider">
          <img
            src={findedProduct?.image || Logo}
            alt={findedProduct?.nom_pro || "product not disponible"}
            className="product-image"
          />
        </div>
      </motion.div>

      {/* Details Section */}
      <motion.div
        className="product-details-section"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <nav className="breadcrumb">
          <a href="/">Category</a> &gt;{" "}
          {findedProduct?.nom_pro || "Unknown Product"}
        </nav>
        <h1 className="nompro">
          {findedProduct?.nom_pro || "il n'a pas de produit "}
        </h1>

        <p className="description">
          {findedProduct?.desc_pro || "IL n'a pas de description "}
        </p>

        {/* Détails avec bouton toggle */}
        <div className="details-container">
          <div className="details-header">
            <h3>Details</h3>
            <button
              className="toggle-button"
              onClick={() => setShowDetails((prev) => !prev)}
            >
              {showDetails ? "−" : "+"}
            </button>
          </div>
          {showDetails && (
            <div className="details-content">
              {Array.isArray(findedProduct.details) &&
              findedProduct.details.length > 0 ? (
                <ul>
                  {findedProduct.details.map((detail, idx) => (
                    <li key={idx}>
                      {Object.entries(detail).map(([key, value]) => (
                        <div key={key}>
                          <strong>{key}:</strong> {value}
                        </div>
                      ))}
                    </li>
                  ))}
                </ul>
              ) : (
                "Il n'a pas de detail "
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetail;
