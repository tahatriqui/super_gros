import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Products.css"; // Import the CSS file
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../assets/domain";
import { useAppContext } from "../../AppContext";

function Products() {
    const {ssid,setSsCat,sscat,istrue,setIstrue} = useAppContext()
  
    
  // Custom Previous Arrow
  const PrevArrow = ({ onClick }) => (
    <div className="arrow prev-arrow" onClick={onClick}>
      <FaChevronLeft size={25} />
    </div>
  );

  // Custom Next Arrow
  const NextArrow = ({ onClick }) => (
    <div className="arrow next-arrow" onClick={onClick}>
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



  //getting data from backend using axios
useEffect(() => {
    axios.get(`${api}/ssscat/${ssid}`).then(res => {
      if (res.data.length > 0) {
        setIstrue(true);
        setSsCat(res.data);
      } else {
        setIstrue(false);
      }
    });
  }, [ssid]);
  const products = [
    { id: 1, name: "Produit 1", desc: "Description du produit 1", image: "https://via.placeholder.com/300x300?text=Produit+1" },
    { id: 2, name: "Produit 2", desc: "Description du produit 2", image: "https://via.placeholder.com/300x300?text=Produit+2" },
    { id: 3, name: "Produit 3", desc: "Description du produit 3", image: "https://via.placeholder.com/300x300?text=Produit+3" },
    { id: 4, name: "Produit 4", desc: "Description du produit 4", image: "https://via.placeholder.com/300x300?text=Produit+4" },
    { id: 5, name: "Produit 5", desc: "Description du produit 5", image: "https://via.placeholder.com/300x300?text=Produit+5" },
  ];
console.log(istrue);

  return (
    <div className="products-container">
      {/* Header Section */}
      <div className="products-header">
        <div>
          <h1 className="products-title">Les Produits</h1>
          <p className="products-description">Découvrez notre large gamme de produits.</p>
        </div>
        <button
          className="view-all-btn"
          onClick={() => console.log("Voir tout")}
        >
          Voir tout
        </button>
      </div>

      {/* Slider Section */}
      <section className="products-slider">
        <Slider {...sliderSettings}>
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-card-content">
                <img src={product.image} alt={product.name} className="product-image" />
                <h2 className="product-name">{product.name}</h2>
                <p className="product-desc">{product.desc}</p>
              </div>
            </div>
          ))}
        </Slider>
      </section>
    </div>
  );
}

export default Products;
