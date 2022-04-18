import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getPopularVideos,
  getVideosByCategory,
} from "../../redux/actions/VideosAction";
import "./CategoriesBar.scss";

const keywords = [
  "All",
  "React js",
  "Redux",
  "Namaste JacaScript",
  "Tanay Pratap",
  "Anime",
  "Music",
  "Coding",
  "Cricket",
  "Football",
  "News",
  "Sports",
  "Technology",
  "Movies",
  "Books",
  "Games",
  "Food",
  "Travel",
  "Fashion",
  "Photography",
  "Health",
  "Education",
  "Science",
  "Nature",
];

const CategoriesBar = () => {
  const [activeElement, setActiveElement] = useState("All");

  const dispatch = useDispatch();
  const handleClick = (value) => {
    setActiveElement(value);
    if (value === "All") {
      dispatch(getPopularVideos());
    } else {
      dispatch(getVideosByCategory(value));
    }
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
