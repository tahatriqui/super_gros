import React, { useState } from "react";
import { motion } from "framer-motion"; // Importer Framer Motion
import "./product_detail.css";
import Logo from "../../assets/Transparent.png";

const ProductDetail = () => {
  const [selectedVariant, setSelectedVariant] = useState("Select");
  const [quantity, setQuantity] = useState(1);

  const handleVariantChange = (e) => {
    setSelectedVariant(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

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
          <img src={Logo} alt="Logo" className="product-image" />
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
          <a href="/">Shop all</a> &gt; <a href="/">Category</a> &gt; Product
          Name
        </nav>
        <h1>Product Name</h1>

        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique.
        </p>

        <ul>
          <li>Lorem ipsum dolor sit amet.</li>
          <li>Lorem ipsum dolor sit amet.</li>
          <li>Lorem ipsum dolor sit amet.</li>
        </ul>

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
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique.
            </p>
          </motion.div>
          <motion.div className="tab" whileHover={{ scale: 1.02 }}>
            <h3>Shipping</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique.
            </p>
          </motion.div>
          <motion.div className="tab" whileHover={{ scale: 1.02 }}>
            <h3>Returns</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProductDetail;
