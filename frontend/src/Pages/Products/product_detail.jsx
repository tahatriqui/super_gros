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

  const { did } = useParams();
  const { filteredProducts  } = useAppContext();

  useEffect(() => {
    const filter = filteredProducts.find((e) => e.id == did);
    if (filter) {
      setFindedProduct({
        ...filter,
        details: typeof filter.details === "string"
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
            alt={findedProduct?.nom_pro || 'product not disponible'}
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
          <a href="/">Category</a> &gt; 
          {findedProduct?.nom_pro || "Unknown Product"}
        </nav>
        <h1>{findedProduct?.nom_pro || "il n'a pas de produit "}</h1>

        <p className="description">{findedProduct?.desc_pro || "IL n'a pas de description "}</p>

        {/* Buttons */}
        <div className="buttons">
          <motion.button
            className="add-to-cart"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Add To Cart
          </motion.button>
          <motion.button
            className="buy-now"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Buy Now
          </motion.button>
        </div>

        {/* Tabs */}
        <motion.div
          className="tabs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.div className="tab" whileHover={{ scale: 1.02 }}>
            <h3>Details</h3>
            <p className="product-category">
              {Array.isArray(findedProduct.details) && findedProduct.details.length > 0 ? (
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
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProductDetail;
