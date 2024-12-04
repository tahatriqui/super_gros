import { motion } from "framer-motion";
import "./liste.css";
import { useAppContext } from "../../AppContext";
import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
//liste pour ssscategories
const Liste = () => {
  const { data, filteredProducts, setFilteredProducts } = useAppContext();
  const { id } = useParams();
  const [showNoProductsMessage, setShowNoProductsMessage] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    setShowNoProductsMessage(false);

    const filtered = data
      .filter((ele) => ele.sssdcat_id == id)
      .map((item) => ({
        ...item,
        details:
          typeof item.details === "string"
            ? JSON.parse(item.details)
            : item.details,
      }));

    setFilteredProducts(filtered);

    if (filtered.length === 0) {
      const timer = setTimeout(() => {
        setShowNoProductsMessage(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [id, data, setFilteredProducts]);

  const handleChange = () => {
    const searchQuery = inputRef.current.value.toLowerCase().trim();

    if (searchQuery.length === 0) {
      setFilteredProducts(
        data
          .filter((ele) => ele.sssdcat_id == id)
          .map((item) => ({
            ...item,
            details:
              typeof item.details === "string"
                ? JSON.parse(item.details)
                : item.details,
          }))
      );
      setShowNoProductsMessage(false);
      return;
    }

    const filtered = filteredProducts.filter((product) =>
      product.nom_pro.toLowerCase().includes(searchQuery)
    );

    setFilteredProducts(filtered);
    setShowNoProductsMessage(filtered.length === 0);
  };

  return (
    <div className="products-container">
      <div className="products-header">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 0",
            width: "100%",
          }}
        >
          <div style={{ flex: 1 }}>
            <h1 className="products-title">Les Produits</h1>
            <p className="products-description">
              Découvrez notre large gamme de produits.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input
              onChange={handleChange}
              ref={inputRef}
              type="text"
              placeholder="Search..."
              style={{
                padding: "8px 12px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                outline: "none",
                fontSize: "14px",
              }}
            />
            <button
              onClick={handleChange}
              style={{
                background: "white",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaSearch
                style={{
                  width: "20px",
                  height: "20px",
                  color: "red",
                }}
              />
            </button>
          </div>
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
                  "Ils n'a pas de details"
                )}
              </p>
              <Link to={`/produit_det/${product.id}`} className="product-button">
                Details
              </Link>
            </motion.div>
          ))
        ) : showNoProductsMessage ? (
          <p
            style={{
              marginLeft: "10vw",
              marginTop: "20vh",
              marginBottom: "20vh",
            }}
          >
            No products exist.
          </p>
        ) : (
          [...Array(3)].map((_, index) => (
            <motion.div
              className="product-card"
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="product-image-placeholder">
                <img src="/loading.gif" alt="Loading..." />
              </div>
              <h3 className="product-title">loading...</h3>
              <p className="product-category">
                <ul>
                  <li>
                    <div>
                      <strong>Poids :</strong> loading...
                    </div>
                    <div>
                      <strong>loading :</strong> loading...
                    </div>
                  </li>
                </ul>
              </p>
              <a className="product-button">Details</a>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Liste;
