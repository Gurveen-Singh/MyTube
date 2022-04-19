/* Importing the necessary modules for the component to work. */
import React, { useEffect, useState } from "react";
import "./VideoList.scss";

import { AiFillEye } from "react-icons/ai";
import request from "../../api/Api";

import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const VideoList = ({ video, searchScreen, subScreen }) => {
  /* Destructuring the video object. */
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      description,
      title,
      publishedAt,
      thumbnails: { medium },
      resourceId,
    },
  } = video;

  /* Checking if the video is a channel or not. */
  const isVideo = !(id.kind === "youtube#channel" || subScreen);

  /* Setting the state of the component. */
  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  /**
   * It gets the video details from the YouTube API and sets the data to the state.
   * Converting the duration of the video to a readable format. */
  useEffect(() => {
    const get_video_details = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: id.videoId,
        },
      });
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    if (isVideo) get_video_details();
  }, [id, isVideo]);

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

  /* Converting the duration of the video to a readable format. */
  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  /* A hook that allows you to navigate to a different route. */
  const navigate = useNavigate();

  /* A ternary operator. It is checking if resourceId is not null, if it is not null it will return
resourceId.channelId, if it is null it will return channelId. */
  const _channelId = resourceId?.channelId || channelId;
  /**
   * If the video is a video, navigate to the video page, otherwise navigate to the channel page.
   */

  const handleClick = () => {
    isVideo
      ? navigate(`/watch/${id.videoId}`)
      : navigate(`/channel/${_channelId}`);
  };

  /* Checking if the video is a video or not. If it is not a video it will return the class name. */
  const thumbnail = !isVideo && "videoHorizontal__thumbnail-channel";

  /* Returning the JSX code. */
  return (
    <Row
      className="py-2 m-1 videoHorizontal align-items-center"
      onClick={handleClick}
    >
      <Col
        xs={6}
        md={searchScreen || subScreen ? 4 : 6}
        className="videoHorizontal__left"
      >
        <LazyLoadImage
          src={medium.url}
          effect="blur"
          className={`videoHorizontal__thumbnail ${thumbnail} `}
          wrapperClassName="videoHorizontal__thumbnail-wrapper"
        />
        {isVideo && (
          <span className="videoHorizontal__duration">{_duration}</span>
        )}
      </Col>
      <Col
        xs={6}
        md={searchScreen || subScreen ? 8 : 6}
        className="p-0 videoHorizontal__right"
      >
        <p className="mb-1 videoHorizontal__title">{title}</p>

        {isVideo && (
          <div className="videoHorizontal__details">
            <AiFillEye /> {numeral(views).format("0.a")} Views •
            {moment(publishedAt).fromNow()}
          </div>
        )}

        {(searchScreen || subScreen) && (
          <p className="mt-1 videoHorizontal__desc">{description}</p>
        )}

        <div className="my-1 videoHorizontal__channel d-flex align-items-center">
          {isVideo && <LazyLoadImage src={channelIcon?.url} effect="blur" />}
          <p className="mb-0">{channelTitle}</p>
        </div>
        {subScreen && (
          <p className="mt-2">{video.contentDetails.totalItemCount} Videos</p>
        )}
      </Col>
    </Row>
  );
};

export default VideoList;
