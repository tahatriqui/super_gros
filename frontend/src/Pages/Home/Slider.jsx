// Slider.js
import React, { useState } from "react";
import "./Slider.css"; // Adjust as necessary for your styling

const Slider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="image-slider">
      <div className="slider-container">
        {images.map((image, index) => (
          <div
            key={index}
            className="slide"
            style={{
              transform: `translateX(${-currentIndex * 100}%)`,
              transition: "transform 0.5s ease",
            }}
          >
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>
      <div className="slider-buttons">
        <button className="prev" onClick={prevSlide}>
          ❮
        </button>
        <button className="next" onClick={nextSlide}>
          ❯
        </button>
      </div>
    </div>
  );
};

export default Slider;
