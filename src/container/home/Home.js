/* Importing the necessary components and functions from the libraries. */
import React, { useEffect } from "react";
import { Col, Container } from "react-bootstrap";
import Video from "../../components/video/Video";
import CategoriesBar from "../../components/categoriesBar/CategoriesBar";
import { useDispatch, useSelector } from "react-redux";
import {
  getPopularVideos,
  getVideosByCategory,
} from "../../redux/actions/VideosAction";

import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonVideo from "../../components/skeletons/SkeletonVideo";

const Home = () => {
  /* A hook that allows you to dispatch actions to the Redux store. */
  const dispatch = useDispatch();

  /* Destructuring the state object. */
  const { videos, activeCategory, loading } = useSelector(
    (state) => state.homeVideos
  );

  /* Calling the getPopularVideos() function from the VideosAction.js file. */
  useEffect(() => {
    dispatch(getPopularVideos());
  }, [dispatch]);

  /**
   * If the activeCategory is "All", then dispatch the getPopularVideos() action, otherwise dispatch the
   * getVideosByCategory(activeCategory) action.
   */
  const fetchData = () => {
    if (activeCategory === "All") {
      dispatch(getPopularVideos());
    } else {
      dispatch(getVideosByCategory(activeCategory));
    }
  };

  /* Returning the container, categories bar, and infinite scroll. */
  return (
    <Container>
      <CategoriesBar />

      <InfiniteScroll
        dataLength={videos.length}
        next={fetchData}
        hasMore={true}
        loader={
          <div className="spinner-border text-danger d-block mx-auto"></div>
        }
        className="row"
      >
        {!loading
          ? videos.map((video, index) => (
              <Col lg={3} md={4} key={index}>
                <Video video={video} key={video.id} />
              </Col>
            ))
          : [...Array(20)].map((_, index) => (
              <Col lg={3} md={4} key={index}>
                <SkeletonVideo />
              </Col>
            ))}
      </InfiniteScroll>
    </Container>
  );
};

export default Home;
