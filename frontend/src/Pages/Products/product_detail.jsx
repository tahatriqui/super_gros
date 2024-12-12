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
  const [activeTab, setActiveTab] = useState("salesPoints");
  const { did } = useParams();
  const { filteredProducts } = useAppContext();

  useEffect(() => {
    const filter = filteredProducts.find((e) => e.id == did);
    if (filter) {
      setFindedProduct({
        ...filter,
        details:
          filter.details && typeof filter.details === "string"
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
            <motion.img
              src={findedProduct?.image || Logo}
              alt={findedProduct?.nom_pro || "produit non valable "}
              className="product-image"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
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
            <motion.a
              href="/"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Category
            </motion.a>
            &gt;{" "}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {findedProduct?.nom_pro || "Unknown Product"}
            </motion.span>
          </nav>
          <h1 className="nompro">
            {findedProduct?.nom_pro || "No Product Available"}
          </h1>

          <p className="description">
            {findedProduct?.desc_pro || "No Description Available"}
          </p>

          {/* Details with Toggle Button */}
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
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                      {Object.entries(detail).map(([key, value]) => (
                        <div key={key}>
                          <strong>{key}:</strong> {value}
                        </div>
                      ))}
                    </motion.li>
                  ))}
                </ul>
              ) : (
                "Ils n'a pas des details"
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="tabs-container">
        <div className="tabs-header">
          <motion.button
            className={`tab-button ${
              activeTab === "salesPoints" ? "active" : ""
            }`}
            onClick={() => setActiveTab("salesPoints")}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            Points De Vente Des Produits
          </motion.button>
          <motion.button
            className={`tab-button ${
              activeTab === "mainParams" ? "active" : ""
            }`}
            onClick={() => setActiveTab("mainParams")}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            Les Principaux Paramètres
          </motion.button>
        </div>

        {activeTab === "salesPoints" && (
          <motion.div
            className="tab-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="tab-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Forte Puissance
            </motion.h2>
            <p className="tab-description">
              L'ensemble de la machine adopte un moteur Cummins 6BTAA5.9 d'une
              puissance de 133 kW...
            </p>
            <motion.h2
              className="tab-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Opération Efficiente
            </motion.h2>
            <p className="tab-description">
              La pompe principale a une grande cylindrée, un rendement élevé et
              une réponse sensible...
            </p>
          </motion.div>
        )}

        {activeTab === "mainParams" && (
          <motion.div
            className="product-parameters"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2>Les principaux paramètres</h2>
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
          </motion.div>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
