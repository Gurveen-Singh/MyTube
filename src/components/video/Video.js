/* Importing the necessary modules for the component to work. */
import React, { useEffect, useState } from "react";
import "./Video.scss";

import { AiFillEye } from "react-icons/ai";
import request from "../../api/Api";

import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

const Video = ({ video, channelScreen }) => {
  /* Destructuring the video object. */
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
    },
    contentDetails,
  } = video;

  /* Setting the state of the component. */
  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);
  /* Converting the duration of the video to a readable format. */

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  /* A hook that is used to navigate to a different page. */
  const navigate = useNavigate();

  /* A ternary operator. It is checking if the id is null or not. If it is null, it will check if the
contentDetails is null or not. If it is not null, it will return the contentDetails. If it is null,
it will return the id. */
  const _videoId = id?.videoId || contentDetails?.videoId || id;

  /**
   * It gets the video details from the YouTube API and sets the data to the state.
   */
  useEffect(() => {
    const get_video_details = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: _videoId,
        },
      });
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    get_video_details();
  }, [_videoId]);

  /**
   * The function gets the channel icon from the YouTube API and sets the channel icon to the state.
   */
  useEffect(() => {
    const get_channel_icon = async () => {
      const {
        data: { items },
      } = await request("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });
      setChannelIcon(items[0].snippet.thumbnails.default);
    };
    get_channel_icon();
  }, [channelId]);

  /**
   * Const handleVideoClick = () =&gt; {
   *     navigate(`/watch/`);
   *   };
   */
  const handleVideoClick = () => {
    navigate(`/watch/${_videoId}`);
  };

  /* Returning the JSX code. */
  return (
    <div className="video" onClick={handleVideoClick}>
      <div className="video__top">
        <LazyLoadImage src={medium.url} effect="blur" />
        <span className="video__top__duration">{_duration}</span>
      </div>
      <div className="video__title">{title}</div>
      <div className="video__details">
        <span>
          <AiFillEye /> {numeral(views).format("0.a")} Views •{" "}
        </span>{" "}
        <span> {moment(publishedAt).fromNow()} </span>
      </div>
      {!channelScreen && (
        <div className="video__channel">
          <LazyLoadImage src={channelIcon?.url} effect="blur" />

          <p>{channelTitle}</p>
        </div>
      )}
    </div>
  );
};

export default Video;
