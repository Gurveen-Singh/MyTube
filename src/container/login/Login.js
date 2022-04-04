import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/actions/AuthAction";
import "./Login.scss";

const Login = () => {
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.auth.accessToken);

  const handleLogin = () => {
    dispatch(login());
  };

  const history = useNavigate();

  useEffect(() => {
    if (accessToken) {
      history("/");
    }
  }, [accessToken, history]);

  return (
    <div className="login">
      <div className="login__container">
        <h2>Youtube Clone</h2>
        <img src="http://pngimg.com/uploads/youtube/youtube_PNG2.png" alt="" />
        <button onClick={handleLogin}>Login With google</button>
        <p>Made By Gurveen Singh</p>
      </div>
    </div>
  );
};

export default Login;
