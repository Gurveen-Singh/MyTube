/* Importing the necessary components and libraries. */
import React, { useEffect, useState } from "react";
import "./SideBar.scss";

import {
  MdSubscriptions,
  MdExitToApp,
  MdThumbUp,
  MdHistory,
  MdHome,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { log_out } from "../../redux/actions/AuthAction";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SideBar = ({ sidebar, handleToggleSidebar }) => {
  /* A hook that allows you to dispatch actions to the Redux store. */
  const dispatch = useDispatch();

  /* A hook that allows you to store a value in the state. */
  const [path, setPath] = useState("/auth");

  /* A hook that allows you to access the Redux store state. */
  const { accessToken } = useSelector((state) => state.auth);

  /**
   * The logOutHandler function is a function that dispatches the log_out action.
   */
  const logOutHandler = () => {
    dispatch(log_out());
  };

  /* Checking if the user is logged in or not. If the user is logged in, the user will be redirected to
  the subscriptions page. If the user is not logged in, the user will be redirected to the login page. */
  useEffect(() => {
    if (accessToken) {
      setPath("/feed/subscriptions");
    } else {
      setPath("/auth");
    }
  }, [accessToken]);

  /* Returning the navbar. */
  return (
    <nav
      className={sidebar ? "sidebar open" : "sidebar"}
      onClick={() => handleToggleSidebar(false)}
    >
      <Link to="/">
        <li>
          <MdHome size={23} />
          <span>Home</span>
        </li>
      </Link>

      <Link to={path}>
        <li>
          <MdSubscriptions size={23} />
          <span>Subscriptions</span>
        </li>
      </Link>

      <li>
        <MdThumbUp size={23} />
        <span>Liked Video</span>
      </li>

      <li>
        <MdHistory size={23} />
        <span>History</span>
      </li>

      <hr />

      <li onClick={logOutHandler}>
        <MdExitToApp size={23} />
        <span>Log Out</span>
      </li>

      <hr />
    </nav>
  );
};

export default SideBar;
