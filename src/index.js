import * as ReactDOMClient from "react-dom/client";

import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/Store";
import "bootstrap/dist/css/bootstrap.min.css";
import "./base.scss";
import { BrowserRouter } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";

const container = document.getElementById("root");

// Create a root.
const root = ReactDOMClient.createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
