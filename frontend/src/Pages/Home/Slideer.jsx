import React, { useState, useEffect } from "react";

const Slider = ({ images, autoPlay = true, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Gestion du défilement automatique
  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(nextSlide, interval);
      return () => clearInterval(timer); // Nettoyer l'intervalle
    }
  }, [currentIndex, isPlaying, interval]);

  return (
    <div style={styles.sliderContainer}>
      {/* Images */}
      <div style={styles.slider}>
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              ...styles.slide,
              opacity: index === currentIndex ? 1 : 0,
              transform: `translateX(${100 * (index - currentIndex)}%)`,
            }}
          >
            <img src={image} alt={`Slide ${index}`} style={styles.image} />
            
          </div>
        ))}
      </div>

      {/* Boutons Précédent/Suivant */}
      <button onClick={prevSlide} style={styles.buttonLeft}>
        ◀
      </button>
      <button onClick={nextSlide} style={styles.buttonRight}>
        ▶
      </button>

      {/* Indicateurs */}
      <div style={styles.indicators}>
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              ...styles.indicator,
              backgroundColor: index === currentIndex ? "#333" : "#ccc",
            }}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  sliderContainer: {
    position: "relative",
    width: "100%", // Largeur du slider (reste ajustable)
    height: "500px", // Hauteur fixe plus petite
    margin: "0 auto", // Centre horizontalement
    overflow: "hidden",
    borderRadius: "10px",
  },
  slider: {
    display: "flex",
    transition: "transform 0.5s ease-in-out",
    height: "100%", // Occupe toute la hauteur du conteneur
  },
  slide: {
    minWidth: "100%",
    transition: "opacity 0.5s ease-in-out",
    position: "relative",
    height: "100%", // Occupe toute la hauteur
  },
  image: {
    width: "100%",
    height: "100%", // Image adaptée à la hauteur
    objectFit: "cover", // Coupe l'image si elle dépasse pour garder une bonne apparence
    borderRadius: "10px",
  },
  buttonLeft: {
    position: "absolute",
    top: "50%",
    left: "10px",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "50%",
    cursor: "pointer",
  },
  buttonRight: {
    position: "absolute",
    top: "50%",
    right: "10px",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "50%",
    cursor: "pointer",
  },
  indicators: {
    position: "absolute",
    bottom: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "8px",
  },
  indicator: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    cursor: "pointer",
  },
};



export default Slider;
