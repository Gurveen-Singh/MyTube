import React, { useState } from "react";
import { Container } from "react-bootstrap";

import Header from "./components/header";
import SideBar from "./components/sidebar";
import HomeScreen from "./container/homeScreen/HomeScreen";

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
          <HomeScreen />
        </Container>
      </div>
    </>
  );
};

export default App;
