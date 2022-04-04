import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/SideBar";
import Home from "./container/home";
import Login from "./container/login";

import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

import "./App.scss";

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
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default App;
