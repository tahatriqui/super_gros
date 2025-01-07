import { motion } from "framer-motion";
import "./liste.css";
import { useAppContext } from "../../AppContext";
import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";

const Liste = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [showNoProductsMessage, setShowNoProductsMessage] = useState(false);

  const {vh,setVh, data,filteredProducts, setFilteredProducts, sscategories, ssscategories, filteredCategory, setFilterdCategory } = useAppContext();

  const [oldP, setOldP] = useState([]);
  const { id } = useParams();
  const inputRef = useRef();
  
  // Filter categories based on the selected ID
  useEffect(() => {
    const filteredCat = sscategories
      .filter((e) => String(e.scat_id) === String(id))
      .map((item) => ({
        ...item,
        count: data.filter((el) => el.sscat_id === item.id).length,
        subCategories: ssscategories
          .filter((sscat) => sscat.sscat_id === item.id)
          .map((sscat) => ({
            name: sscat.nom_ssscat,
            id: sscat.id,
            count: data.filter((el) => el.sssdcat_id === sscat.id).length,
          })),
      }));

    setFilterdCategory(filteredCat);
  }, [id, sscategories, data, setFilterdCategory, ssscategories]);

  // Fetch and filter products based on category ID
  useEffect(() => {
    setShowNoProductsMessage(false);

    const filtered = data
      .filter((item) => item.sssdcat_id === id)
      .map((item) => ({
        ...item,
        details:
          typeof item.details === "string"
            ? (() => {
                try {
                  return JSON.parse(item.details);
                } catch {
                  console.error("Failed to parse details for product:", item);
                  return {};
                }
              })()
            : item.details,
      }));

    setFilteredProducts(filtered);
    setOldP(filtered);

    if (filtered.length === 0) {
      const timer = setTimeout(() => {
        setShowNoProductsMessage(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [id, data, setFilteredProducts]);

  // Filter products based on selected subcategory
  useEffect(() => {
    if (selectedSubCategory) {
      const filtered = data.filter(
        (item) =>
          item.sssdcat_id === id &&
          item.subCategory === selectedSubCategory.name
      );

      setFilteredProducts(filtered);
      setShowNoProductsMessage(filtered.length === 0);
    }
  }, [selectedSubCategory, id, data, setFilteredProducts]);

  // Handle search input
const handleSearchChange = () => {
  const searchQuery = inputRef.current.value.toLowerCase();

  if (searchQuery.length > 0) {
    // Filter only within the current filtered products (oldP)
    const searchResults = oldP.filter((product) =>
      product.nom_pro.toLowerCase().includes(searchQuery)
    );

    setFilteredProducts(searchResults);
    setShowNoProductsMessage(searchResults.length === 0);
  } else {
    // Reset to the previously filtered products when the search is cleared
    setFilteredProducts(oldP);
    setShowNoProductsMessage(false);
  }
};



  useEffect(() => {
  if (!selectedSubCategory) return;

  const filtered = data
    .filter((item) => item.sssdcat_id === selectedSubCategory.id)
    .map((item) => ({
      ...item,
      details:
        typeof item.details === "string"
          ? (() => {
              try {
                return JSON.parse(item.details);
              } catch {
                console.error("Failed to parse details for product:", item);
                return {};
              }
            })()
          : item.details,
    }));
   
  setFilteredProducts(filtered);
  setShowNoProductsMessage(filtered.length === 0);
}, [selectedSubCategory, data]);


  return (
    <div className="app" >
      {/* Sidebar */}
      <aside className="sidebar" style={{marginTop:'6.7rem'}}>
        <h2 className="sidebar-title">Catégories</h2>
        <ul className="sidebar-list">
          {filteredCategory?.map((category, index) => (
            <li key={index}>
              <div
                className={`sidebar-item ${
                  selectedCategory === category.nom_scat ? "active" : ""
                }`}
                onClick={() => {
                  setSelectedCategory(
                    selectedCategory === category.nom_scat
                      ? null
                      : category.nom_scat
                  );
                  if(category.count>0){
                  setVh(category.count * 16)}
                  if (category.count > 0) {
                    const filteredProducts = data
                      .filter((e) => e.sscat_id === category.id)
                      .map((item) => ({
                        ...item,
                        details:
                          typeof item.details === "string"
                            ? (() => {
                                try {
                                  return JSON.parse(item.details);
                                } catch {
                                  console.error("Failed to parse details for product:", item);
                                  return {};
                                }
                              })()
                            : item.details,
                      }));

                    setOldP(filteredProducts);
                    setFilteredProducts(filteredProducts);
                  }
                }}
              >
                {category.nom_scat}{" "}
                <span className="category-count">
                  {category.count > 0 ? category.count : <FaChevronDown />}
                </span>
              </div>
              {selectedCategory === category.nom_scat && (
                <div className="subcategories">
                  <ul className="subcategories-list">
                    {category.subCategories.map((subCategory, subIndex) => (
                      <li
                        key={subIndex}
                        className={`subcategory-item ${
                          selectedSubCategory?.name === subCategory.name
                            ? "active"
                            : ""
                        }`}
                      onClick={() => {
                      // Set the selected subcategory
                      setSelectedSubCategory(subCategory);
                      if(subCategory.count>0){
                    setVh(subCategory.count * 16 )}
                      // Filter products immediately
                      const filtered = data
                        .filter((item) => item.sssdcat_id === subCategory.id)
                        .map((item) => ({
                          ...item,
                          details:
                            typeof item.details === "string"
                              ? (() => {
                                  try {
                                    return JSON.parse(item.details);
                                  } catch {
                                    console.error("Failed to parse details for product:", item);
                                    return {};
                                  }
                                })()
                              : item.details,
                        }));
                      // Update the filtered products and oldP
                      setFilteredProducts(filtered);
                      setOldP(filtered);
                      // Update "no products" message
                      setShowNoProductsMessage(filtered.length === 0);
                    }}
                      >
                        {subCategory.name}
                        <span className="category-count">
                          {subCategory.count}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </aside>
      {/* Main Content */}
      <main className="main-content" style={{ marginBottom:'180px' ,marginTop:'6rem'}}>
        <header className="header">
          <h1>Nos Produits</h1>
          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              ref={inputRef}
              onChange={handleSearchChange}
              className="search-input"
            />
            <button onClick={handleSearchChange} className="search-button">
              <FaSearch />
            </button>
          </div>
        </header>
        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts?.length > 0 ? (
            filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="product-card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <div className="product-image">
                  <img
                    src="https://supergros.ma/img/HoistingMachinery/TruckCrane/QY16D.jpg"
                    alt={product.nom_pro}
                    className="product-image"
                  />
                </div>
                <h3 className="product-title">{product.nom_pro}</h3>
                <div className="product-category">
                  {product.details
                    ? Array.isArray(product.details) &&
                      product.details.length > 0
                      ? product.details.map((detail, idx) => (
                          <div key={idx}>
                            {Object.entries(detail).map(([key, value]) => (
                              <div key={key}>
                                <strong>{key}:</strong> {value}
                              </div>
                            ))}
                          </div>
                        ))
                      : typeof product.details === "object"
                      ? Object.entries(product.details).map(([key, value]) => (
                          <div key={key}>
                            <strong>{key}:</strong> {value}
                          </div>
                        ))
                      : "Aucun détail disponible"
                    : "Détails non fournis pour ce produit"}
                </div>
                <Link to={`/produit_det/${product.id}`} className="product-button">
                  Détails
                </Link>
              </motion.div>
            ))
          ) : showNoProductsMessage ? (
            <p className="no-products-message">Aucun produit disponible.</p>
          ) : (
            [...Array(3)].map((_, index) => (
              <motion.div
                key={index}
                className="loading-placeholder"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Liste;
