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

  // Initialize captcha
  const initCaptcha = () => {
    setMessage("");
    if (!imageSets.length) return;

    const set = imageSets[Math.floor(Math.random() * imageSets.length)];
    const shuffled = [...set.images].sort(() => Math.random() - 0.5);
    setShuffledImages(shuffled);
    setCorrectImage(set.images[set.oddIndex]);
  };

  useEffect(() => {
    initCaptcha();
  }, [imageSets]);

  // Drag start
  const dragStart = (e: React.DragEvent<HTMLImageElement>, src: string) => {
    e.dataTransfer.setData("text/plain", src);
  };

  // Drag over
  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Drop
  const drop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedImage = e.dataTransfer.getData("text/plain");
    if (droppedImage === correctImage) {
      setMessage("✅ Captcha Verified!");
      if (onSuccess) onSuccess();
    } else {
      setMessage("❌ Wrong! Try again.");
      if (onFail) onFail();
    }
  };

  return (
    <div className="captcha-container">
      <h3>Drag the odd one out into the box!</h3>
      <div className="images-container">
        {shuffledImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt="captcha"
            draggable
            onDragStart={(e) => dragStart(e, src)}
          />
        ))}
      </div>
      <div className="drop-zone" onDragOver={dragOver} onDrop={drop}>
        Drop Here
      </div>
      <p className="captcha-message">{message}</p>
      <button onClick={initCaptcha}>Reset Captcha</button>
    </div>
  );
};

export default HumanCaptcha;
