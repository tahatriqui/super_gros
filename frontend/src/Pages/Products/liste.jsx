import { motion } from "framer-motion";
import "./liste.css";
import { useAppContext } from "../../AppContext";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Liste = () => {
  const { data,filteredProducts, setFilteredProducts } = useAppContext(); // Assume 'data' contains your full products list
  const { id } = useParams();

 // Local state for filtered products

  useEffect(() => {
    // Filter and parse JSON details
    const filtered = data
      .filter((ele) => ele.sssdcat_id == id) // Filter by category ID
      .map((item) => ({
        ...item,
        details: typeof item.details === "string"
          ? JSON.parse(item.details) 
          : item.details,
      }));

    setFilteredProducts(filtered);
  }, [id, data]); 

  return (
    <div className="products-container">
      <div className="products-header">
        <div>
          <h1 className="products-title">Les Produits</h1>
          <p className="products-description">
            Découvrez notre large gamme de produits.
          </p>
        </div>
      </div>
      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <motion.div
              className="product-card"
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <div className="product-image-placeholder">
                <img
                  src="https://www.groupe-premium.com/socopim/wp-content/uploads/2022/02/123-300x162.png"
                  alt={product.nom_pro}
                />
              </div>
              <h3 className="product-title">{product.nom_pro}</h3>
              <p className="product-category">
                {Array.isArray(product.details) && product.details.length > 0 ? (
                  <ul>
                    {product.details.map((detail, idx) => (
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
                  "No details available"
                )}
              </p>
              <Link to={`/produit_det/${product.id}`} className="product-button">Details</Link>
            </motion.div>
          ))
        ) : (
          <div className="no-products-message">
            <h3>Aucun produit disponible pour cette catégorie.</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Liste;
