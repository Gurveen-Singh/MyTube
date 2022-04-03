import React from "react";
import "./Video.scss";

import { AiFillEye } from "react-icons/ai";

const Video = () => {
  return (
    <div className="video">
      <div className="video__top">
        <span className="video__top__duration">5M</span>
      </div>
      <div className="video__title">Yoo</div>
      <div className="video__details">
        <span>
          <AiFillEye /> 3 Views
        </span>{" "}
        <span> Publish </span>
      </div>

      <div className="video__channel">
        <p>Yoo</p>
      </div>
    </div>
  );
};

export default Video;
