import React from "react";
import { Container } from "react-bootstrap";
import Header from "./components/header";
import SideBar from "./components/sidebar";
import HomeScreen from "./container/homeScreen/HomeScreen";

const App = () => {
  return (
    <div>
      <Header />
      <div className="app__container">
        <SideBar />
        <Container fluid className="app__main">
          <HomeScreen />
        </Container>
      </div>
    </div>
  );
};

export default App;
