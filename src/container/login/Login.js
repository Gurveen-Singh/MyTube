/* This is importing the necessary modules for the component. */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/actions/AuthAction";

import "./Login.scss";

const Login = () => {
  /* Creating instance of useDispatch Hook */
  const dispatch = useDispatch();

  /* A hook that is used to navigate to a different route. */
  const navigate = useNavigate();

  /* A hook that is used to access the state of the store. */
  const accessToken = useSelector((state) => state.auth.accessToken);

  /**
   * When the user clicks the login button, dispatch the login action.
   */
  const handleLogin = () => {
    dispatch(login());
  };

  /* If use is logged in then redirect to home */
  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  /* This is the JSX that is returned by the component. */
  return (
    <div className="login">
      <div className="login__container">
        <h2>My Tube</h2>
        <img src="http://pngimg.com/uploads/youtube/youtube_PNG2.png" alt="" />
        <button onClick={handleLogin}>Login With google</button>
        <p>Made By Gurveen Singh</p>
      </div>
    </div>
  );
};

export default Login;
