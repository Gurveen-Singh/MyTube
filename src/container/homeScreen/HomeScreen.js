import React from "react";
import { Container, Row } from "react-bootstrap";
import CategoriesBar from "../../components/categoriesBar";

const HomeScreen = () => {
  return (
    <Container>
      <CategoriesBar />
      <Row></Row>
    </Container>
  );
};

export default HomeScreen;
