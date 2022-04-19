/* Importing the necessary components and libraries. */
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Header, SideBar } from "./components/index";
import {
  Login,
  Home,
  WatchVideo,
  Search,
  Channel,
  Subscription,
} from "./container/index";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.scss";

const App = () => {
  /* A hook that is used to toggle the sidebar. */
  const [sidebar, toggleSidebar] = useState(false);

  /**
   * Const handleToggleSidebar = () => toggleSidebar((value) => !value);
   */
  const handleToggleSidebar = () => toggleSidebar((value) => !value);

  /* Returning the JSX code. */
  return (
    <React.Fragment>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className="app__container">
        <SideBar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
        <Container fluid className="app__main ">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/auth" element={<Login />} />
            <Route path="/search/:query" element={<Search />} />
            <Route path="/watch/:id" element={<WatchVideo />} />
            <Route path="/feed/subscriptions" element={<Subscription />} />
            <Route path="/channel/:channelId" element={<Channel />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default App;
