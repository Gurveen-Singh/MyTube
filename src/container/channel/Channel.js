/* Importing the modules from the libraries. */
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Video } from "../../components/index";
import { getChannelDetails } from "../../redux/actions/ChannelAction";
import { getVideosByChannel } from "../../redux/actions/VideosAction";

import numeral from "numeral";

import "./Channel.scss";

const Channel = () => {
  /* Destructuring the channelId from the useParams hook. */
  const { channelId } = useParams();

  /* Creating instance of useDispatch hook */
  const dispatch = useDispatch();

  /* Calling the action creators. */
  useEffect(() => {
    dispatch(getVideosByChannel(channelId));
    dispatch(getChannelDetails(channelId));
  }, [dispatch, channelId]);

  /* Destructuring the state from the redux store. */
  const { videos, loading } = useSelector((state) => state.channelVideos);
  const { snippet, statistics } = useSelector(
    (state) => state.channelDetails.channel
  );

  /* Returning the JSX. */
  return (
    <>
      <div className="px-5 py-2 my-2 d-flex justify-content-between align-items-center channelHeader">
        <div className="d-flex align-items-center">
          <img src={snippet?.thumbnails?.default?.url} alt="" />

          <div className="ml-3 channelHeader__details">
            <h3>{snippet?.title}</h3>
            <span>
              {numeral(statistics?.subscriberCount).format("0.a")} subscribers
            </span>
          </div>
        </div>

        <button>Subscribe</button>
      </div>
      <Container>
        <Row className="mt-2">
          {!loading
            ? videos?.map((video, index) => (
                <Col md={3} lg={3} key={index}>
                  <Video video={video} channelScreen />
                </Col>
              ))
            : [...Array(15)].map((_, ind) => (
                <Col md={3} lg={3} key={ind}>
                  <SkeletonTheme color="#343a40" highlightColor="#3c4147">
                    <Skeleton width="100%" height="140px" />
                  </SkeletonTheme>
                </Col>
              ))}
        </Row>
      </Container>
    </>
  );
};

export default Channel;
