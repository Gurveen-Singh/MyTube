import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CategoriesBar from "../../components/categoriesBar";
import Video from "../../components/video";
import { useDispatch, useSelector } from "react-redux";
import { getPopularVideos } from "../../redux/actions/VideosAction";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPopularVideos());
  }, [dispatch]);

  const { videos } = useSelector((state) => state.homeVideos);

  return (
    <Container>
      <CategoriesBar />
      <Row>
        {videos.map((video, index) => (
          <Col lg={3} md={4} key={index}>
            <Video video={video} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
