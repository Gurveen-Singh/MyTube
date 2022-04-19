/* Importing all the necessary components and libraries for the header component. */
import React, { useState, useEffect } from "react";
import "./Header.scss";
import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import avatar from "../../icons/avatar.png";

const Header = ({ handleToggleSidebar }) => {
  /* A hook that is used to store the value of the input field. */
  const [input, setInput] = useState("");

  /* Setting the path to /auth. */
  const [path, setPath] = useState("/auth");

  /* Destructuring the accessToken from the state.auth. */
  const { accessToken } = useSelector((state) => state.auth);

  /* Getting the user from the state.auth.user. */
  const user = useSelector((state) => state.auth?.user);

  /* A hook that is used to navigate to a different route. */
  const navigate = useNavigate();

  /* Checking if the accessToken is present or not. If it is present, it will set the path to /. If it is
not present, it will set the path to /auth. */
  useEffect(() => {
    if (accessToken) {
      setPath("/");
    } else {
      setPath("/auth");
    }
  }, [accessToken]);

  /**
   * When the form is submitted, prevent the default action, and navigate to the search page with the
   * input value as the search term.
   * @param e - the event object
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${input}`);
  };

  /**
   * It navigates to the home page.
   */
  const navigateToHome = () => {
    navigate("/");
  };

/* Returning the header component. */
  return (
    <div className="header ">
      <FaBars
        className="header__menu"
        size={26}
        onClick={() => handleToggleSidebar()}
      />

      <img
        src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"
        alt=""
        className="header__logo"
        onClick={navigateToHome}
      />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">
          <AiOutlineSearch size={22} />
        </button>
      </form>

      <div className="header__icons">
        <MdNotifications size={28} />
        <MdApps size={28} />
        <img
          src={user === null ? avatar : user?.photoURL}
          alt="avatar"
          onClick={() => navigate(path)}
        />
      </div>
    </div>
  );
};

export default Header;
