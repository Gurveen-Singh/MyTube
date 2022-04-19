/* Importing the necessary modules for the app to run. */
import * as ReactDOMClient from "react-dom/client";
import React from "react";
import App from "./App";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./base.scss";
import store from "./redux/Store";

/* Getting the root element from the index.html file. */
const container = document.getElementById("root");

// Create a root.
const root = ReactDOMClient.createRoot(container);

/* Rendering the app. */
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
