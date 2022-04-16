import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import { Header, SideBar } from "./components/index";
import {
  Login,
  Home,
  WatchVideo,
  // Search,
  // Channel,
  // Subscription,
} from "./container/index";

import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

import "./App.scss";
import { useSelector } from "react-redux";

const App = () => {
  const handleToggleSidebar = () => toggleSidebar((value) => !value);
  const { accessToken, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && accessToken) {
      navigate("/auth");
    }
  }, [accessToken, loading, navigate]);

  const [sidebar, toggleSidebar] = useState(false);

  return (
    <React.Fragment>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className="app__container">
        <SideBar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
        <Container fluid className="app__main ">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/auth" element={<Login />} />
            <Route path="/watch/:id" element={<WatchVideo />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default App;
