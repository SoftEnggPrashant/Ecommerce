import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, theme } from "@chakra-ui/react";
import App from "./App";
import { Provider } from "react-redux";
import {store} from "./Store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>
);
