import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createGlobalStyle } from "styled-components";
import { Provider } from "react-redux";
import todoProps from "./TodoPropStorage";

const DefaultBackground = createGlobalStyle`
  body{
    background-color: #ff7979;
    min-width:350px;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <DefaultBackground />
    <Provider store={todoProps}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
