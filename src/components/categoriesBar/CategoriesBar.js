import React, { useState } from "react";

import "./CategoriesBar.scss";

const keywords = [
  "All",
  "React js",
  "React Native",
  "Redux",
  "Music",
  "Anime",
  "Coding",
  "Cricket",
  "Football",
  "Figma",
  "Gaming",
  "Namaste JavaScript",
  "Tanay Pratap",
  "FreeCodeCamp",
];

const CategoriesBar = () => {
  const [activeElement, setActiveElement] = useState("All");

  const handleClick = (value) => {
    setActiveElement(value);
    // if (value === "All") {
    //   dispatch(getPopularVideos());
    // } else {
    //   dispatch(getVideosByCategory(value));
    // }
  };

  return (
    <div className="categoriesBar">
      {keywords.map((value, i) => (
        <span
          onClick={() => handleClick(value)}
          key={i}
          className={activeElement === value ? "active" : ""}
        >
          {value}
        </span>
      ))}
    </div>
  );
};

export default CategoriesBar;
