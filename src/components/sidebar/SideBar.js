import React from "react";
import "./SideBar.scss";

import {
  MdSubscriptions,
  MdExitToApp,
  MdThumbUp,
  MdHome,
} from "react-icons/md";

import { useDispatch } from "react-redux";
import { log_out } from "../../redux/actions/AuthAction";
import { Link } from "react-router-dom";

const Sidebar = ({ sidebar, handleToggleSidebar }) => {
  const dispatch = useDispatch();
  const logOutHandler = () => {
    dispatch(log_out());
  };
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
      <Link to="/feed/subscriptions">
        <li>
          <MdSubscriptions size={23} />
          <span>Subscriptions</span>
        </li>
      </Link>

      <li>
        <MdThumbUp size={23} />
        <span>Liked Video</span>
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

export default Sidebar;
