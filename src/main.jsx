import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { HashRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </ChakraProvider>
);
