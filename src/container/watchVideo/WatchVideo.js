/* Importing the modules. */
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Comments, VideoList, VideoMetaData } from "../../components/index";
import {
  getRelatedVideos,
  getVideoById,
} from "../../redux/actions/VideosAction";
import "./WatchVideo.scss";

const WatchVideo = () => {
  /* Destructuring the id from the useParams hook. */
  const { id } = useParams();

  /* Creating instance of useDispatch Hook */
  const dispatch = useDispatch();

  /* A hook that is used to fetch data from the API. */
  useEffect(() => {
    dispatch(getVideoById(id));

    dispatch(getRelatedVideos(id));
  }, [dispatch, id]);

  /* Destructuring the video and loading from the state.selectedVideo. */
  const { video, loading } = useSelector((state) => state.selectedVideo);

  /* Destructuring the videos and loading from the state.relatedVideos. */
  const { videos, loading: relatedVideosLoading } = useSelector(
    (state) => state.relatedVideos
  );

  /* Returning the JSX. */
  return (
    <Row>
      <Col lg={8}>
        <div className="watchScreen__player">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            title={video?.snippet?.title}
            allowFullScreen
            width="100%"
            height="100%"
          ></iframe>
        </div>
        {!loading ? (
          <VideoMetaData video={video} videoId={id} />
        ) : (
          <h6>Loading...</h6>
        )}

        <Comments
          videoId={id}
          totalComments={video?.statistics?.commentCount}
        />
      </Col>
      <Col lg={4}>
        {!loading ? (
          videos
            ?.filter((video) => video.snippet)
            .map((video) => <VideoList video={video} key={video.id.videoId} />)
        ) : (
          <SkeletonTheme color="#343a40" highlightColor="#3c4147">
            <Skeleton width="100%" height="130px" count={15} />
          </SkeletonTheme>
        )}
      </Col>
    </Row>
  );
};

export default WatchVideo;
