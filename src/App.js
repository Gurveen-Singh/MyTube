import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/SideBar";
import Login from "./container/login";
import Home from "./container/home";
import WatchVideo from "./container/watchVideo";

import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

import "./App.scss";
import { useSelector } from "react-redux";

const App = () => {
  const { accessToken, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && accessToken) {
      navigate("/login");
    }
  }, [accessToken, loading, navigate]);

  const [sidebar, toggleSidebar] = useState(false);

  const handleToggleSidebar = () => toggleSidebar((value) => !value);

  return (
    <React.Fragment>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className="app__container">
        <Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
        <Container fluid className="app__main ">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/watch:id" element={<WatchVideo />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default App;
