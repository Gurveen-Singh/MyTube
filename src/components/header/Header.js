import React, { useState, useEffect } from "react";
import "./Header.scss";

import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import avatar from "../../icons/avatar.png";

const Header = ({ handleToggleSidebar }) => {
  const [input, setInput] = useState("");

  const [path, setPath] = useState("/auth");
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken) {
      setPath("/");
    } else {
      setPath("/auth");
    }
  }, [accessToken]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search/${input}`);
  };

  const navigateToHome = () => {
    navigate("/");
  };

  const user = useSelector((state) => state.auth?.user);

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
