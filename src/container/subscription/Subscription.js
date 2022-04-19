/* Importing the necessary components and libraries. */

import { useEffect } from "react";
import { Container } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { VideoList } from "../../components/index";
import { getSubscribedChannels } from "../../redux/actions/VideosAction";

const Subscription = () => {
  /* Creating instance of useDispatch Hook */
  const dispatch = useDispatch();

  /* A hook that is used to fetch data from the server. */
  useEffect(() => {
    dispatch(getSubscribedChannels());
  }, [dispatch]);

  /* Destructuring the state object. */
  const { loading, videos } = useSelector(
    (state) => state.subscriptionsChannel
  );

  /* Returning the container and the skeleton theme. */
  return (
    <Container fluid>
      {!loading ? (
        videos?.map((video) => (
          <VideoList video={video} key={video.id} subScreen />
        ))
      ) : (
        <SkeletonTheme color="#343a40" highlightColor="#3c4147">
          <Skeleton width="100%" height="160px" count={20} />
        </SkeletonTheme>
      )}
    </Container>
  );
};

export default Subscription;
