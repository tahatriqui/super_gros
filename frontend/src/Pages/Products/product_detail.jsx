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
  const [showDetails, setShowDetails] = useState(false);

  const { did } = useParams();
  const { filteredProducts,setVh } = useAppContext();
  setVh(14)

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
    <>
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
              <motion.button
                className="toggle-button"
                onClick={() => setShowDetails((prev) => !prev)}
                initial={{ rotate: 0 }}
                animate={{ rotate: showDetails ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {showDetails ? "−" : "+"}
              </motion.button>
            </div>
            <motion.div
              className="details-content"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: showDetails ? "auto" : 0,
                opacity: showDetails ? 1 : 0,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
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
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Sections "Points de vente des produits" et "Les principaux paramètres" */}
      <div className="product-parameters">
        <div className="product-sales-points">
          <h2>Les principaux paramètres</h2>
        </div>

        {/* Les principaux paramètres */}
        <motion.div
          className="table-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <table className="custom-table">
            <thead>
              <tr>
                <th>Spécifications techniques</th>
                <th>Unité</th>
                <th>Paramètres</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Longueur</td>
                <td>mètres</td>
                <td>5</td>
              </tr>
              <tr>
                <td>Largeur</td>
                <td>mètres</td>
                <td>3</td>
              </tr>
              <tr>
                <td>Hauteur</td>
                <td>mètres</td>
                <td>2.5</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </>
  );
};

export default ProductDetail;
