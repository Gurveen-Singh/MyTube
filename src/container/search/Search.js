/* Importing the necessary components and libraries. */
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideosBySearch } from "../../redux/actions/VideosAction";
import { VideoList } from "../../components/index";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Search = () => {
  /* Destructuring the query from the useParams hook. */
  const { query } = useParams();

  /* Creating instance of useDispatch Hook */
  const dispatch = useDispatch();

  /* Destructuring the state of the searchedVideos. */
  const { videos, loading } = useSelector((state) => state.searchedVideos);

  /* A hook that is used to fetch data from the API. */
  useEffect(() => {
    dispatch(getVideosBySearch(query));
  }, [query, dispatch]);

  /* Returning the container. */
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
