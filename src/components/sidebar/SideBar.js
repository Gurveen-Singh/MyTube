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
  const dispatch = useDispatch();
  const logOutHandler = () => {
    dispatch(log_out());
  };

  const [path, setPath] = useState("/auth");

  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken) {
      setPath("/feed/subscriptions");
    } else {
      setPath("/auth");
    }
  }, [accessToken]);

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
