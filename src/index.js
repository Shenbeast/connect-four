import React from "react";
import { render } from "react-dom";
import { createGlobalStyle } from "styled-components";

import ConnectFour from "./components/ConnectFour";

const GlobalStyle = createGlobalStyle`
  body {
    font-family:  "Open Sans", Arial, Helvetica, sans-serif;
    color: black;
    padding: 40px;
    @media (max-width: 640px) {
      padding: 20px;
    }
    font-weight: 400;
  }
  h1 {
    font-size: 42px;
    @media (max-width: 640px) {
      font-size: 28px;
    }
  }
  button {
    cursor: pointer;
  }
`;

render(
  <>
    <GlobalStyle />
    <ConnectFour />
  </>,
  document.getElementById("app")
);
