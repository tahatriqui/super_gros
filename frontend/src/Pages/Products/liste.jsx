import React from "react";
import { motion } from "framer-motion";
import "./liste.css";

const Liste = () => {
  const products = [
    { title: "Engins Lourds", category: "BTP", price: "$$$" },
    { title: "Véhicules Transport", category: "Camion", price: "$$$" },
    { title: "Équipements Spéciaux", category: "Incendie", price: "$$$" },
    { title: "Pièces de Rechange", category: "Standard", price: "$$$" },
    { title: "Matériel Restauration", category: "Boulangerie", price: "$$$" },
    { title: "Électroménagers", category: "Cuisine", price: "$$$" },
    { title: "Sécurité Défense", category: "Militaire", price: "$$$" },
    { title: "Produits Agricoles", category: "Irrigation", price: "$$$" },
  ];

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
        {products.map((product, index) => (
          <motion.div
            className="product-card"
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <div className="product-image-placeholder"></div>
            <h3 className="product-title">{product.title}</h3>
            <p className="product-category">{product.category}</p>
            <p className="product-price">{product.price}</p>
            <button className="product-button">Details</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Liste;
