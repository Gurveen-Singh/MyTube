/* Importing the necessary modules. */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getPopularVideos,
  getVideosByCategory,
} from "../../redux/actions/VideosAction";
import "./CategoriesBar.scss";

/* An array of strings. */
const keywords = [
  "All",
  "React js",
  "MERN",
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
  /* A React Hook. It is used to store the state of the component. */
  const [activeElement, setActiveElement] = useState("All");

  /* A React Hook. It is used to dispatch the action. */
  const dispatch = useDispatch();

  /**
   * If the value is "All", then dispatch the getPopularVideos() action, otherwise dispatch the
   * getVideosByCategory(value) action.
   * @param value - the value of the clicked element
   */
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
