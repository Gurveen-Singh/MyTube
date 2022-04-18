import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideosBySearch } from "../../redux/actions/VideosAction";
import { VideoList } from "../../components/index";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Search = () => {
  const { query } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideosBySearch(query));
  }, [query, dispatch]);

  const { videos, loading } = useSelector((state) => state.searchedVideos);

  return (
    <Container>
      {!loading ? (
        videos?.map((video, index) => (
          <VideoList video={video} key={index} searchScreen />
        ))
      ) : (
        <SkeletonTheme color="#343a40" highlightColor="#3c4147">
          <Skeleton width="100%" height="160px" count={20} />
        </SkeletonTheme>
      )}
    </Container>
  );
};

export default Search;
