import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Slider = ({ images, autoPlay = true, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Autoplay logic with interval
  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(nextSlide, interval);
      return () => clearInterval(timer); // Clear interval on cleanup
    }
  }, [isPlaying, interval]);

  if (!images || images.length === 0) {
    return <div>No images to display</div>;
  }

  return (
    <div
      style={styles.sliderContainer}
      onMouseEnter={() => setIsPlaying(false)} // Pause on hover
      onMouseLeave={() => setIsPlaying(true)} // Resume on mouse leave
    >
      <div
        style={{
          ...styles.slider,
          transform: `translateX(-${currentIndex * 100}%)`, // Apply translateX to move slides
        }}
      >
        {images.map((image, index) => (
          <div key={index} style={styles.slide}>
            <img src={image} alt={`Slide ${index}`} style={styles.image} />
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button onClick={prevSlide} style={styles.buttonLeft} aria-label="Previous slide">
        ◀
      </button>
      <button onClick={nextSlide} style={styles.buttonRight} aria-label="Next slide">
        ▶
      </button>

      {/* Indicators */}
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

// Styles remain the same as the original code
const styles = {
  sliderContainer: {
    position: "relative",
    width: "100%",
    height: "600px",
    margin: "0 auto",
    overflow: "hidden",
    borderRadius: "10px",
    marginTop:'5.5rem',
  },
  slider: {
    display: "flex",
    transition: "transform 0.5s ease-in-out", // Smooth transition for sliding
    height: "100%",
  },
  slide: {
    minWidth: "100%",
    height: "100%",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
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

Slider.propTypes = {
  images: PropTypes.array.isRequired,
  autoPlay: PropTypes.bool,
  interval: PropTypes.number,
};

export default Slider;
