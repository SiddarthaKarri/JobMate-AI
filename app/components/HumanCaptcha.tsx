import React, { useState, useEffect } from "react";
import "./HumanCaptcha.css";

export interface ImageSet {
  images: string[];   // array of image URLs
  oddIndex: number;   // index of odd one out
}

interface HumanCaptchaProps {
  imageSets: ImageSet[];
  onSuccess?: () => void;
  onFail?: () => void;
}

const HumanCaptcha: React.FC<HumanCaptchaProps> = ({ imageSets, onSuccess, onFail }) => {
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);
  const [correctImage, setCorrectImage] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize captcha
  const initCaptcha = () => {
    setMessage("");
    setSelectedImage("");
    if (!imageSets.length) return;

    const set = imageSets[Math.floor(Math.random() * imageSets.length)];
    const shuffled = [...set.images].sort(() => Math.random() - 0.5);
    setShuffledImages(shuffled);
    setCorrectImage(set.images[set.oddIndex]);
  };

  useEffect(() => {
    initCaptcha();
  }, [imageSets]);

  // Check answer
  const checkAnswer = (imageToCheck: string) => {
    if (imageToCheck === correctImage) {
      setMessage("✅ Captcha Verified!");
      if (onSuccess) onSuccess();
    } else {
      setMessage("❌ Wrong! Try again.");
      if (onFail) onFail();
    }
  };

  // Desktop drag handlers
  const dragStart = (e: React.DragEvent<HTMLImageElement>, src: string) => {
    e.dataTransfer.setData("text/plain", src);
  };

  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const drop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedImage = e.dataTransfer.getData("text/plain");
    checkAnswer(droppedImage);
  };

  // Mobile touch handlers
  const handleImageClick = (src: string) => {
    if (isMobile) {
      // Single tap to select
      setSelectedImage(src);
      setMessage(`Selected image. Tap "Submit Answer" to verify.`);
    }
  };

  // Mobile submit button
  const handleMobileSubmit = () => {
    if (selectedImage) {
      checkAnswer(selectedImage);
      setSelectedImage("");
    } else {
      setMessage("Please select an image first!");
    }
  };

  return (
    <div className="captcha-container">
      <h3>{isMobile ? "Tap the odd one out!" : "Drag the odd one out into the box!"}</h3>
      {isMobile && (
        <p className="mobile-instructions">
          Select the image that doesn't belong, then tap "Submit Answer"
        </p>
      )}
      <div className="images-container">
        {shuffledImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt="captcha"
            draggable={!isMobile}
            onDragStart={!isMobile ? (e) => dragStart(e, src) : undefined}
            onClick={() => handleImageClick(src)}
            className={`captcha-image ${selectedImage === src ? 'selected' : ''} ${isMobile ? 'mobile-touch' : ''}`}
          />
        ))}
      </div>
      
      {/* Desktop drop zone */}
      {!isMobile && (
        <div className="drop-zone" onDragOver={dragOver} onDrop={drop}>
          Drop Here
        </div>
      )}
      
      {/* Mobile submit button */}
      {isMobile && (
        <button 
          className={`mobile-submit-btn ${selectedImage ? 'active' : 'disabled'}`}
          onClick={handleMobileSubmit}
          disabled={!selectedImage}
        >
          {selectedImage ? 'Submit Answer' : 'Select an image first'}
        </button>
      )}
      
      <p className="captcha-message">{message}</p>
      <button onClick={initCaptcha} className="reset-btn">Reset Captcha</button>
    </div>
  );
};

export default HumanCaptcha;
