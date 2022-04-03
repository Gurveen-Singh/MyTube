import React, { useState } from "react";
import { Container } from "react-bootstrap";

import Header from "./components/header";
import SideBar from "./components/sidebar";
import Home from "./container/home/Home";
import Login from "./container/login";

import "./App.scss";

const App = () => {
  const [sidebar, toggleSidebar] = useState(false);

  const handleToggleSidebar = () => toggleSidebar((value) => !value);

  return (
    <>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className="app__container border border-info">
        <SideBar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
        <Container fluid className="app__main border border-warning">
          <Home />
        </Container>
      </div>
      <Login />
    </>
  );
};

export default App;
