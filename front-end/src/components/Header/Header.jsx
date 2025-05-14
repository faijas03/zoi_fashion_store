import React from "react";
import "./Header.css";
import { useEffect, useState } from "react";

function Header() {
  const images = ["/h2.png", "/h1.jpg", "/h3.jpg", "/banner.jpg"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // change every 5 seconds

    return () => clearInterval(interval); // clean up on unmount
  }, []);

  const backgroundStyle = {
    backgroundImage: `url(${images[currentIndex]})`,
  };
  return (
    <div className="header" style={backgroundStyle}>
      <div className="header-content">
        <h1>FASHION</h1>
        <p>ROF EDAM YLNO</p>
        <h2>REAL PEOPLE</h2>
      </div>
    </div>
  );
}

export default Header;
